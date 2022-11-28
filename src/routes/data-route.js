import express from "express";
import { MongoClient } from "mongodb";

const router = express.Router();

router.get("/data/ratings", (req, res) => {
  if (req.user === undefined) {
    res.redirect("/");
    return;
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      client
        .db("steamrec")
        .collection("users")
        .find(
          { userId: req.user.id },
          { projection: { _id: 0, gameId: 1, rating: 1 } }
        )
        .toArray()
        .then((array) => res.json(array))
        .finally(() => {
          client.close();
        });
    })
    .catch((err) => console.log(err));
});

export default router;
