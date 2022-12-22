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
    let ratedGames = await db
      .collection("apps")
      .find({ _id: { $in: req.body.ratedGames.map((it) => it.id) } })
      .toArray()
      .then((array) => {
        return req.body.ratedGames.map((itm1) => ({
          ...array.find((itm2) => itm1.id == itm2._id),
          ...itm1,
        }));
      });

    let ratings = await getRatings(ratedGames);
    let recommended = await getRecommended(ratings);

    res.json({
      ratings: ratings,
      recommended: recommended,
    });
  });
});

export default router;
