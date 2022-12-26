import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { config as dotenvConfig } from "dotenv";
import {
  connectMongoClient,
  disconnectMongoClient,
} from "./src/services/mongodb.js";
import { CyclicSessionStore } from "@cyclic.sh/session-store";

import authRoutes from "./src/routes/auth-route.js";
import steamRoutes from "./src/routes/steam-route.js";
import ratingRoutes from "./src/routes/rating-route.js";
import recommendRoutes from "./src/routes/recommend-route.js";
import { initPassport } from "./src/services/passport.js";

dotenvConfig();

const app = express();
const viewPath = dirname(fileURLToPath(import.meta.url)) + "/src/view/";
const corsOptions = {
  origin: process.env.CYCLIC_URL,
};
const cyclicStoreOptions = {
  table: {
    name: process.env.CYCLIC_DB,
  },
};

try {
  await connectMongoClient();

  app
    .use(express.static(viewPath))
    .use(morgan("tiny"))
    .use(cors(corsOptions))
    .use(bodyParser.json())
    .use(
      session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        store: new CyclicSessionStore(cyclicStoreOptions),
      })
    )
    .use(passport.initialize())
    .use(passport.session());

  // Passport
  initPassport();

  // Routes
  app.use(authRoutes);
  app.use(steamRoutes);
  app.use(ratingRoutes);
  app.use(recommendRoutes);

  // Serve view
  app.get("/", (res) => {
    res.sendFile(viewPath + "index.html");
  });

  // Launch
  connectMongoClient()
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log(`Listening on ${process.env.PORT}`);
      });
    })
    .catch((err) => {
      if (err) {
        console.error(err);
        return false;
      }
    });
} finally {
  disconnectMongoClient();
}
