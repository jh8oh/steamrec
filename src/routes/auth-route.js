import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/auth/check", (req, res) => {
  console.log("User:" + req.user);
  console.log(req.session.passport);
  if (req.user === undefined) {
    res.json({});
  } else {
    res.json({
      user: req.user,
    });
  }
});

router.get(
  "/auth/redirect",
  passport.authenticate("steam", { failureRedirect: "/" })
);

router.get(
  "/auth/return",
  passport.authenticate("steam", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

export default router;
