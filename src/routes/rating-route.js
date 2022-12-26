import express from "express";
import { ensureAuthenticated } from "./auth-route.js";
import { getDatabase } from "../services/mongodb.js";

const router = express.Router();

router.get("/data/ratings", ensureAuthenticated, (req, res) => {
  if (req.user === undefined) {
    res.redirect("/");
    return;
  }

  getDatabase()
    .then((db) => {
      db.collection("ratings")
        .find(
          { userId: req.user.id },
          { projection: { _id: 0, gameId: 1, rating: 1 } }
        )
        .toArray()
        .then((array) => res.json(array));
    })
    .catch((err) => console.log(err));
});

router.post("/data/ratings/rate", ensureAuthenticated, (req, res) => {
  if (req.user === undefined) {
    res.redirect("/");
    return;
  }

  getDatabase()
    .then((db) => {
      db.collection("ratings").updateOne(
        { userId: req.user.id, gameId: req.body.gameId },
        { $set: { rating: req.body.rating } },
        { upsert: true }
      );
    })
    .catch((err) => console.log(err));
});

router.delete("/data/ratings", ensureAuthenticated, (req, res) => {
  if (req.user === undefined) {
    res.redirect("/");
    return;
  }

  getDatabase().then((db) => {
    db.collection("ratings")
      .deleteMany({ userId: req.user.id })
      .then(() => {
        res.status(200).send("ok");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("not ok");
      });
  });
});

export default router;
