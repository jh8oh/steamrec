import express from "express";
import passport from "passport";

const router = express.Router();

// Check if user is logged in
router.get("/auth/check", (req, res) => {
  if (req.user === undefined) {
    res.json({});
  } else {
    res.json({
      user: req.user,
    });
  }
});

// Redirect to Steam OpenID
router.get(
  "/auth/redirect",
  passport.authenticate("steam", { failureRedirect: "/" })
);

// Return from Steam OpenID
router.get(
  "/auth/return",
  passport.authenticate("steam", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/");
  }
);

// Log out
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
    res.redirect("/");
  });
});

export default router;
