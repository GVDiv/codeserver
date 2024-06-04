import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import usersManager from "../data/mongo/managers/UsersManager.mongo.js";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";

// Estrategia de registro
passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        if (!email || !password) {
          return done(
            null,
            null,
            new Error("Please enter email and password!")
          );
        }
        const existingUser = await usersManager.readByEmail(email);
        if (existingUser) {
          return done(null, null, new Error("Email is already registered!"));
        }
        const hashedPassword = createHash(password);
        req.body.password = hashedPassword;
        const user = await usersManager.create(req.body);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Estrategia de login
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await usersManager.readByEmail(email);
        if (!user) {
          return done(null, null, new Error("Invalid email or password!"));
        }
        const isValidPassword = verifyHash(password, user.password);
        if (!isValidPassword) {
          return done(null, null, new Error("Invalid email or password!"));
        }
        const tokenPayload = {
          email: user.email,
          role: user.role,
          photo: user.photo,
          _id: user._id,
          online: true,
        };
        const token = createToken(tokenPayload);
        tokenPayload.token = token;
        return done(null, tokenPayload);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Estrategia JWT
passport.use(
  "jwt",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: process.env.SECRET_JWT,
    },
    (jwtPayload, done) => {
      try {
        if (jwtPayload) {
          return done(null, jwtPayload);
        } else {
          return done(null, null, new Error("Invalid token!"));
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
