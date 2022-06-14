import { Strategy as SteamStrategy } from "passport-steam";
import { config as dotenvConfig } from "dotenv";
import passport from "passport";

dotenvConfig();

passport.use(
  new SteamStrategy(
    {
      realm: process.env.BASE_URL,
      returnURL: `${process.env.BASE_URL}/auth/return`,
      apiKey: process.env.API_KEY,
    },
    (identifier, profile, done) => {
      process.nextTick(() => {
        profile.identifier = identifier;
        return done(null, profile);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
