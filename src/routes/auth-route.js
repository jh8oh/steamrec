import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/auth/redirect",
  passport.authenticate("steam", { failureRedirect: '/login/failed' })
);

router.get(
  "/auth/return",
  passport.authenticate("steam", {
    successRedirect: `${process.env.BASE_URL}/`,
    failureRedirect: "/login/failed",
  })
);

export default router;
