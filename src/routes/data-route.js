import express from "express";
import { getDatabase } from "../services/mongodb";

const router = express.Router();

router.get("/data/ratings", (req, res) => {
  if (req.user === undefined) {
    res.redirect("/");
    return;
  }

  getDatabase()
    .collection("users")
    .find(
      { userId: req.user.id },
      { projection: { _id: 0, gameId: 1, rating: 1 } }
    )
    .toArray()
    .then((array) => res.json(array))
    .catch((err) => console.log(err));
});

export default router;
