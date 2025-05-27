import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import { notFound, errorHandler }from './middleware/error.js'
import './config/db.js'
import session from "express-session";
import cookieParser from "cookie-parser";



const app = express();

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, //We got this from the .env file
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Logging
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'OK' }));

// Error handling
app.use(notFound);
app.use(errorHandler);




app.use(cookieParser())

app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,
  cookie:{
    secure: process.env.NODE_ENV === "production",
    httpOnly:true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: 'strict',
  }
}))



export default app;