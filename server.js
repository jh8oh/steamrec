import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { config as dotenvConfig } from "dotenv";
import "./src/services/passport.js";

import authRoutes from "./src/routes/auth-route.js";
import steamRoutes from "./src/routes/steam-route.js";
import ratingRoutes from "./src/routes/rating-route.js";
import recommendRoutes from "./src/routes/recommend-route.js";

dotenvConfig();

const app = express();
const viewPath = dirname(fileURLToPath(import.meta.url)) + "/src/view/";
const corsOptions = {
  origin: process.env.BASE_URL,
};

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
    })
  )
  .use(passport.initialize())
  .use(passport.session());

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
app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
