import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { findUserByGoogleId, createUser, findUserById } from '../models/userModel.js';

dotenv.config();

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.GOOGLE_CALLBACK_URL}`,
    scope: ['profile', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists with this Google ID
      let user = await findUserByGoogleId(profile.id);
      
      if (user) {
        // User exists, return user
        return done(null, user);
      }
      
      // Create new user
      const newUser = {
        google_id: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        avatar: profile.photos[0].value,
        provider: 'google'
      };
      
      user = await createUser(newUser);
      return done(null, user);
      
    } catch (error) {
      console.error('Error in Google Strategy:', error);
      return done(error, null);
    }
  }
));

// Serialize user for session storage
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;