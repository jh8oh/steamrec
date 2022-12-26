import { config as dotenvConfig } from "dotenv";
import passport from "passport";
import { Strategy as SteamStrategy } from "passport-steam";

dotenvConfig();

export function initPassport() {
  passport.use(
    new SteamStrategy(
      {
        realm: process.env.CYCLIC_URL,
        returnURL: `${process.env.CYCLIC_URL}/auth/return`,
        apiKey: process.env.API_KEY,
      },
      async (identifier, profile, done) => {
        const user = { id: profile.id, displayName: profile.displayName };
        return done(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
}
