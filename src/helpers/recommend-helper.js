import { getDatabase } from "../services/mongodb.js";

export default class RecommendationsHelper {
  #recommendationsFull = [];
  #ratings = {};

  constructor(ratings) {
    this.#ratings = ratings;
  }

  // Getters & Setters
  getRecommendations(filters) {
    const filteredRecommendations = this.#recommendationsFull
      .filter((it) => this.matchFilter(it, filters))
      .map((it) => ({
        id: it._id,
        name: it.name,
      }));
    const popped = filteredRecommendations.splice(0, 24);
    this.#recommendationsFull = this.#recommendationsFull.filter(
      (it) => !popped.map((pop) => pop._id).includes(it._id)
    );

    return popped;
  }

  // Public methods

  async setRecommendations(notRecommendedIds) {
    const positivelyRatedNames = this.#ratings.developerRatings
      .concat(this.#ratings.publisherRatings)
      .concat(this.#ratings.tagRatings)
      .concat(this.#ratings.genreRatings)
      .concat(this.#ratings.categoryRatings)
      .filter((it) => it.rating > 0)
      .map((it) => it.name)
      .join(" ");

    await getDatabase().then(async (db) => {
      await db
        .collection("apps")
        .find(
          {
            _id: { $nin: notRecommendedIds },
            $text: { $search: positivelyRatedNames },
          },
          {
            score: { $meta: "textScore" },
            projection: {
              name: 1,
              type: 1,
              release_date: 1,
              recommendations: 1,
              metacritic: 1,
              adult: 1,
            },
          }
        )
        .sort({ score: { $meta: "textScore" } })
        .limit(1000)
        .toArray()
        .then((array) => {
          this.#recommendationsFull = array;
        });
    });
  }

  // Private function

  matchFilter(recommendation, filters) {
    if (!filters.type.includes(recommendation.type)) return false;
    if (recommendation.release_date.coming_soon == filters.released)
      return false;
    if (
      recommendation.recommendations != null &&
      recommendation.recommendations < filters.recommendation
    )
      return false;
    if (
      recommendation.metacritic != null &&
      recommendation.metacritic < filters.metacritic
    )
      return false;
    if (recommendation.adult != filters.adult) return false;

    return true;
  }
}
