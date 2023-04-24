import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../user.js";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.SECRET;

// JWT Strategy
passport.use(
  new Strategy(
    {
      secretOrKey: secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      try {
        const user = await User.find({ _id: payload.id });

        if (user) done(null, user);
        else done(new Error("User not found"));
      } catch (err) {
        done(err);
      }
    }
  )
);
