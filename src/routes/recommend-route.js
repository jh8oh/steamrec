import express from "express";
import { getDatabase } from "../services/mongodb.js";
import { getRatings } from "../helpers/ratings-helper.js";
import { getRecommended } from "../helpers/recommend-helper.js";

const router = express.Router();

router.post("/data/recommend", (req, res) => {
  if (req.user === undefined) {
    res.redirect("/");
    return;
  }

  getDatabase().then(async (db) => {
    let ownedGames = await db
      .collection("games")
      .find({ _id: { $in: req.body.ownedGames.map((it) => it.id) } })
      .toArray()
      .then((array) => {
        return req.body.ownedGames.map((itm1) => ({
          ...array.find((itm2) => itm1.id == itm2._id),
          ...itm1,
        }));
      });

    let ratings = await getRatings(ownedGames);
    let recommended = await getRecommended(ratings);

    res.json({
      ratings: ratings,
      recommended: recommended,
    });
  });
});

export default router;
