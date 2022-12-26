import { getDatabase } from "../services/mongodb.js";

export default class RecommendationsHelper {
  #recommendationsFull = [];
  #filter = {};
  #count = 0;
  #ratings = {};

  constructor(ratings) {
    this.#ratings = ratings;
  }

  // Getters & Setters
  getRecommendations(filter = null, isUpdateFilter = false) {
    if (filter) this.#filter = filter;

    const filteredRecommendations = this.#recommendationsFull
      .filter((it) => this.matchFilter(it, this.#filter))
      .map((it) => ({
        id: it._id,
        name: it.name,
      }));

    if (!isUpdateFilter) {
      this.#count += 24;
    }
    const spliced = filteredRecommendations.splice(0, this.#count);

    return spliced;
  }

  // Public methods

  async setRecommendations(notRecommendedIds) {
    this.#recommendationsFull = await getDatabase()
      .collection("apps")
      .aggregate(this.generatePipeline(notRecommendedIds))
      .toArray();
  }

  // Private function

  matchFilter(recommendation, filters) {
    if (!filters.type.includes(recommendation.type)) {
      return false;
    }
    if (recommendation.release_date.coming_soon == filters.released) {
      return false;
    }
    if (
      recommendation.recommendations == null &&
      !filters.recommendations.acceptNull
    ) {
      return false;
    }
    if (
      recommendation.recommendations != null &&
      recommendation.recommendations < filters.recommendations.value
    ) {
      return false;
    }
    if (recommendation.metacritic == null && !filters.metacritic.acceptNull) {
      return false;
    }
    if (
      recommendation.metacritic != null &&
      recommendation.metacritic < filters.metacritic.value
    ) {
      return false;
    }
    if (recommendation.adult != filters.adult) {
      return false;
    }

    return true;
  }

  generatePipeline(notRecommendedIds) {
    let basePipeline = [
      {
        $search: {
          index: "RecommendSearchIndex",
          compound: {
            should: [],
          },
          returnStoredSource: true,
        },
      },
      {
        $match: {
          _id: { $nin: notRecommendedIds },
        },
      },
      {
        $limit: 1000,
      },
    ];

    basePipeline[0].$search.compound.should = [
      ...this.returnCompoundSearch(
        this.#ratings.developerRatings,
        "developers",
        3
      ),
      ...this.returnCompoundSearch(
        this.#ratings.publisherRatings,
        "publishers",
        3
      ),
      ...this.returnCompoundSearch(this.#ratings.tagRatings, "tags", 4),
      ...this.returnCompoundSearch(this.#ratings.genreRatings, "genres", 2),
      ...this.returnCompoundSearch(
        this.#ratings.categoryRatings,
        "categories",
        1
      ),
    ];

    return basePipeline;
  }

  returnCompoundSearch(ratings, path, boostConstant) {
    let should = [];
    const maxRating = ratings
      .map((it) => it.rating)
      .reduce((max, value) => Math.max(max, value));
    const normalizedRatings = ratings.map((it) => ({
      name: it.name,
      rating: boostConstant + it.rating / maxRating,
    }));

    normalizedRatings.forEach((r) => {
      should.push({
        text: {
          path: path,
          query: r.name,
          score: { boost: { value: r.rating } },
        },
      });
    });

    return should;
  }
}
