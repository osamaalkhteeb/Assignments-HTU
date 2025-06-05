import UserModel from "../models/usersModels.js";
import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  try {
    if (req.session.authenticated && req.session.userId) {
      const user = await UserModel.findById(req.session.userId);
      if (user) {
        req.user = user;
        return next();
      }
    }

    // const authHeader = req.headers["authorization"];
    // const token = authHeader?.split(" ")[1];

    const token = req.cookies.token
    
    if (!token) {
      throw new Error("Authentication token missing");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      throw new Error("User not found");
    }

    //Renew session
    req.session.userId = user.id;
    req.session.authenticated = true;
    req.user = user;

    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};

export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (roles.length && !roles.includes(req.user.role)) {
      const error = new Error("Unauthorized access");
      error.statusCode = 403;
      return next(error);
    }
    next();
  };
};
