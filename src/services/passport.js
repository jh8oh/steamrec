import { config as dotenvConfig } from "dotenv";
import passport from "passport";
import { Strategy as SteamStrategy } from "passport-steam";
import { getDatabase } from "./mongodb.js";

dotenvConfig();

export function initPassport() {
  passport.use(
    new SteamStrategy(
      {
        realm: process.env.CYCLIC_URL,
        returnURL: `${process.env.CYCLIC_URL}/auth/return`,
        apiKey: process.env.API_KEY,
      },
      (identifier, profile, done) => {
        getDatabase()
          .collection("users")
          .updateOne(
            { _id: parseInt(profile.id) },
            {
              $set: {
                _id: parseInt(profile.id),
                displayName: profile.displayName,
              },
            },
            { upsert: true }
          )
          .then(() => done(null, profile));
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    getDatabase()
      .collection("users")
      .findOne({ _id: id })
      .then((it) => done(null, it));
  });
}
