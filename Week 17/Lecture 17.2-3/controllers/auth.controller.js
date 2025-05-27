import { authenticate } from "../middleware/auth.js";
import User from "../models/user.model.js";
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

      const exsitingUser = await User.findOne({ where: { email } });

      const newUser = await User.create({ email, password, name });
      const token = User.generateToken(newUser.id);

      res.status(201).json({
        success: true,
        token: token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          createdAt: user.created_at,
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

      const user = await User.findOne({ where: { email } });

      const isMatch = await user.verifyPassword(password);
      const token = User.generateToken(user.id);

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
      const user = await User.findByPk(req.user.id,{
        attributes: ["id", "name", "email", "role"],
      });
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

      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("Invalid Credentials");

      const isMatch = await user.verifyPassword(currentPassword);
      if (!isMatch) throw new Error("Current password doesn't match ");

      //   User.update({ password: currentPassword }); we can use it but the two btm lines are easier
      user.password = newPassword;
      await user.save();
      res.json({
        success: true,
        massage: "Password updated successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
