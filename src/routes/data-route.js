import express from "express";
import { getDatabase } from "../services/mongodb.js";

const router = express.Router();

router.get("/data/ratings", (req, res) => {
  if (req.user === undefined) {
    res.redirect("/");
    return;
  }

  getDatabase()
    .then((db) => {
      db.collection("users")
        .find(
          { userId: req.user.id },
          { projection: { _id: 0, gameId: 1, rating: 1 } }
        )
        .toArray()
        .then((array) => res.json(array));
    })
    .catch((err) => console.log(err));
});

router.post("/data/ratings/rate", (req, res) => {
  if (req.user === undefined) {
    res.redirect("/");
    return;
  }

  getDatabase()
    .then((db) => {
      db.collection("users").updateOne(
        { userId: req.user.id, gameId: req.body.gameId },
        { $set: { rating: req.body.rating } },
        { upsert: true }
      );
    })
    .catch((err) => console.log(err));
});

export default router;
