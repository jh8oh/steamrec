import express from "express";
import passport from "passport";

const router = express.Router();

// Check if user is logged in
router.get("/auth/check", (req, res) => {
  res.json({ isLoggedIn: req.isAuthenticated() });
});

export function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

// Log out
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
    res.redirect("/");
  });
});

export default router;
