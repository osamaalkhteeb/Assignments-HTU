import jwt from "jsonwebtoken";
import Usermodel from "../models/userModel.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token; // We get the jwt token that is stored in the cookies
    if (!token) throw new Error("No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // we check if the token in the cookie the same token we have

    const user = await Usermodel.findById(decoded.id); //we check if the user exsists
    if (!user) throw new Error("User not found");

    req.user = user;
    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};
