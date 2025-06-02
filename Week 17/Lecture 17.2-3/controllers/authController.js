import UserModel from "../models/usersModels.js";
import {
  loginSchema,
  registerSchema,
  changePasswordSchema,
} from "../utils/validation.js";

const AuthController = {
  async register(req, res, next) {
    try {
      const { error, value } = registerSchema.validate(req.body);
      if (error) throw new Error(error.details[0].message);

      const { email, password, name } = value;

      const exsitingUser = await UserModel.findByEmail(email);
      if (exsitingUser) throw new Error("Email already in use"); // the throw error works like a break when its triggered it stops from doing the lines after it

      const newUser = await UserModel.create({ email, password, name });
    

      req.session.userId = newUser.id;
      req.session.authenticated = true;

      const token = UserModel.generateToken(newUser.id);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        sameSite: "strict",
      });

      res.status(201).json({
        success: true,
        token: token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          createdAt: newUser.created_at,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) throw new Error(error.details[0].message);
      const { email, password } = value;

      const user = await UserModel.findByEmail(email);
      if (!user) throw new Error("Invalid Credentials");

      const isMatch = await UserModel.verifyPassword(password, user.password);
      if (!isMatch) throw new Error("Invalid password");

      // Create session
      req.session.userId = user.id;
      req.session.authenticated = true;

      const token = UserModel.generateToken(user.id);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        sameSite: "strict",
      });
      res.json({
        success: true,
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async getMe(req, res, next) {
    try {
      const user = await UserModel.findById(req.user.id); // we get the req.user.id from the auth.js line 32
      if (!user) throw new Error("User not found");
      res.json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  async changePassword(req, res, next) {
    try {
      const { error, value } = changePasswordSchema.validate(req.body);
      if (error) throw new Error(error.details[0].message);

      const { currentPassword, newPassword } = value;

      const user = await UserModel.findByEmail(req.user.email);
      if (!user) throw new Error("Invalid Credentials");

      const isMatch = await UserModel.verifyPassword(
        currentPassword,
        user.password
      );
      if (!isMatch) throw new Error("Current password doesn't match ");

      await UserModel.updatePassword(user.id, newPassword);

      res.json({
        success: true,
        massage: "Password updated successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  async logout(req, res, next) {
    try {
      req.session.destroy((err) => {
        if (err) throw err;
      });
      res.clearCookies("token");
      res.clearCookies("connect.sid");
      res.json({ success: true, message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;
