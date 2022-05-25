import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import { config as dotenvConfig } from "dotenv";
import "./src/services/passport.js";

import authRouter from "./src/routes/auth-route.js";

dotenvConfig();

const app = express();
const corsOptions = {
  origin: process.env.BASE_URL,
};

app
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
app.use(authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
