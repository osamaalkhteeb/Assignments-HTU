import Usermodel from "../models/userModel.js";
import { registerSchema, loginSchema } from "../utils/authValidation.js";

const AuthController = {
  async register(req, res, next) {
    try {
      const { error, value } = registerSchema.validate(req.body); // this is used to validate using a schema we built
      if (error) throw new Error(error.details[0].message);

    
      const exsistingUser = await Usermodel.findByEmail(value.email); //we check if there is any user with the samne email
      if (exsistingUser) throw new Error("Email already exists");

      const newUser = await Usermodel.create(value); // we create a new user
      const token = Usermodel.generateToken(newUser.id); // we give the new user a jwt token

      req.session.userId = newUser.id; //this cones from the app.js
      res.status(201).json({ success: true, token, user: newUser }); //(201) means created and the rest is given to the frontend
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { error, value } = loginSchema.validate(req.body); // this is used to validate using a schema we built
      if (error) throw new Error(error.details[0].message);

      const user = await Usermodel.findByEmail(value.email); // we look for the email and make sure it's there
      if (!user) throw new Error("User not found");

      const isMatch = await Usermodel.verifyPassword(
        value.password,
        user.password
      ); //we check if the password we have is the same the user inputed
      if (!isMatch) throw new Error("Wrong password");

      const token = Usermodel.generateToken(user.id); // we generate a jwt token for the user when he logs in

      req.session.userId = user.id; //this cones from the app.js

      res.json({ success: true, token, user });
    } catch (error) {
      next(error);
    }
  },

  async me(req, res, next) {
    try {
      const user = await Usermodel.findByid(req.user.id); // we get the req.user.id from the auth middleware line 14
      if (!user) throw new Error("User not found");
    } catch (error) {
      next(error);
    }
  },
  async logout(req, res, next) {
    try {
        //destroy the sassion 
      req.session.destroy((err) => {
        if (err) throw err;
      
      //clear cookies after session is destoryed
      res.clearCookie("token"); //JWT cookie (if any)
      res.clearCookie("connect.sid");// express session cookie
      res.json({ success: true, message: "Logged out successfully" });
      });
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;
