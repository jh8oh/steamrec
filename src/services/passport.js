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
      async (identifier, profile, done) => {
        const user = {
          _id: profile.id,
          displayName: profile.displayName,
        };
        await getDatabase()
          .collection("users")
          .updateOne({ _id: user._id }, { $set: user }, { upsert: true })
          .then(() => done(null, user));
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    await getDatabase()
      .collection("users")
      .findOne({ _id: id })
      .then((it) => done(null, it));
  });
}
