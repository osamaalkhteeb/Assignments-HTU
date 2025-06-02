import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Import configurations
import sessionConfig from './config/session.js';
import passport from './config/passport.js';

// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';

// Import utilities
import { createResponse } from './utils/helpers.js';


dotenv.config();

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for development, configure for production
  crossOriginEmbedderPolicy: false
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: createResponse(false, 'Too many requests', null, 'Rate limit exceeded'),
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Session middleware
app.use(session(sessionConfig));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json(createResponse(true, 'Server is running', {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  }));
});



// Root endpoint
app.get('/', (req, res) => {
  res.json(createResponse(true, 'OAuth 2 Google Authentication API', {
    version: '1.0.0',
    endpoints: {
      auth: '/auth/google',
      callback: '/auth/google/callback',
      user: '/auth/user',
      logout: '/auth/logout',
      profile: '/user/profile'
    }
  }));
});

// 404 handler


// Global error handler


export default app;