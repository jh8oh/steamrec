import { getDatabase } from "../services/mongodb.js";

export async function getRecommended(ratings, filters, notRecommendedIds) {
  const positivelyRatedNames = ratings.developerRatings
    .concat(ratings.publisherRatings)
    .concat(ratings.tagRatings)
    .concat(ratings.genreRatings)
    .concat(ratings.categoryRatings)
    .filter((it) => it.rating > 0)
    .map((it) => it.name)
    .join(" ");

  return getDatabase().then((db) => {
    return db
      .collection("apps")
      .find(
        {
          _id: { $nin: notRecommendedIds },
          type: { $in: filters.type },
          "release_date.coming_soon": !filters.released,
          $or: [
            { recommendations: { $gt: filters.recommendations } },
            { recommendations: null },
          ],
          $or: [
            { metacritic: { $gt: filters.metacritic } },
            { metacritic: null },
          ],
          adult: { $in: [filters.adult, false] },
          $text: { $search: positivelyRatedNames },
        },
        { score: { $meta: "textScore" }, projection: { name: 1 } }
      )
      .sort({ score: { $meta: "textScore" } })
      .limit(24)
      .toArray();
  });
}
