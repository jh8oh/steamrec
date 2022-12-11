import { getDatabase } from "../services/mongodb.js";

export async function getRatings(ownedGames) {
  return Promise.all([
    populateRatingsArray(ownedGames),
    getTagsInfo(ownedGames),
    getGenresInfo(ownedGames),
    getCategoriesInfo(ownedGames),
  ]).then(([ratings, tagInfo, genreInfo, categoryInfo]) => ({
    developerRatings: ratings.developerRatings
      .map((d) => ({
        developer: d.developer,
        ratingPercent: d.rating / d.count,
      }))
      .filter((it) => it.ratingPercent != 0)
      .sort((a, b) => b.ratingPercent - a.ratingPercent),
    publisherRatings: ratings.publisherRatings
      .map((p) => ({
        publisher: p.publisher,
        ratingPercent: p.rating / p.count,
      }))
      .sort((a, b) => b.ratingPercent - a.ratingPercent),
    tagRatings: ratings.tagRatings
      .map((t) => {
        let matchingTagInfo = tagInfo.find((info) => info._id == t.tagId);
        return {
          tagId: t.tagId,
          tagDescription: matchingTagInfo.description,
          ratingPercent: t.rating / t.count,
        };
      })
      .filter((it) => it.ratingPercent != 0)
      .sort((a, b) => b.ratingPercent - a.ratingPercent),
    genreRatings: ratings.genreRatings
      .map((g) => {
        let matchingGenreInfo = genreInfo.find((info) => info._id == g.genreId);
        return {
          genreId: g.genreId,
          genreDescription: matchingGenreInfo.description,
          ratingPercent: g.rating / g.count,
        };
      })
      .filter((it) => it.ratingPercent != 0)
      .sort((a, b) => b.ratingPercent - a.ratingPercent),
    categoryRatings: ratings.categoryRatings
      .map((c) => {
        let matchingCategoryInfo = categoryInfo.find(
          (info) => info._id == c.categoryId
        );
        return {
          categoryId: c.categoryId,
          categoryDescription: matchingCategoryInfo.description,
          ratingPercent: c.rating / c.count,
        };
      })
      .filter((it) => it.ratingPercent != 0)
      .sort((a, b) => b.ratingPercent - a.ratingPercent),
  }));
}

// Private functions

async function populateRatingsArray(ownedGames) {
  let developerRatings = [];
  let publisherRatings = [];
  let tagRatings = [];
  let genreRatings = [];
  let categoryRatings = [];

  // Loop through each games and populate ratings array with {id, rating, count} objects
  ownedGames.forEach((game) => {
    // Developer Ratings
    game.developers?.forEach((developer) => {
      let i = developerRatings.findIndex((it) => it.developer == developer);
      if (i > -1) {
        developerRatings[i].rating += getRatingDiff(game.rating);
        developerRatings[i].count++;
      } else {
        developerRatings.push({
          developer: developer,
          rating: getRatingDiff(game.rating),
          count: 1,
        });
      }
    });

    // Publisher Ratings
    game.publishers?.forEach((publisher) => {
      let i = publisherRatings.findIndex((it) => it.publisher == publisher);
      if (i > -1) {
        publisherRatings[i].rating += getRatingDiff(game.rating);
        publisherRatings[i].count++;
      } else {
        publisherRatings.push({
          publisher: publisher,
          rating: getRatingDiff(game.rating),
          count: 1,
        });
      }
    });

    // Tag Ratings
    game.tags?.forEach((tag) => {
      let i = tagRatings.findIndex((it) => it.tagId == tag.tagId);
      if (i > -1) {
        tagRatings[i].rating += tag.voteAmount * getRatingDiff(game.rating);
        tagRatings[i].count += tag.voteAmount;
      } else {
        tagRatings.push({
          tagId: tag.tagId,
          rating: tag.voteAmount * getRatingDiff(game.rating),
          count: tag.voteAmount,
        });
      }
    });

    // Genre Ratings
    game.genres?.forEach((genre) => {
      let i = genreRatings.findIndex((it) => it.genreId == genre);
      if (i > -1) {
        genreRatings[i].rating += getRatingDiff(game.rating);
        genreRatings[i].count++;
      } else {
        genreRatings.push({
          genreId: genre,
          rating: getRatingDiff(game.rating),
          count: 1,
        });
      }
    });

    // Category Ratings
    game.categories?.forEach((category) => {
      let i = categoryRatings.findIndex((it) => it.categoryId == category);
      if (i > -1) {
        categoryRatings[i].rating += getRatingDiff(game.rating);
        categoryRatings[i].count++;
      } else {
        categoryRatings.push({
          categoryId: category,
          rating: getRatingDiff(game.rating),
          count: 1,
        });
      }
    });
  });

  return {
    developerRatings: developerRatings,
    publisherRatings: publisherRatings,
    tagRatings: tagRatings,
    genreRatings: genreRatings,
    categoryRatings: categoryRatings,
  };
}

async function getTagsInfo(ownedGames) {
  let uniqueTagIds = [
    ...new Set(
      ownedGames
        .map((it) => it.tags)
        .flat(1)
        .map((it) => it?.tagId)
    ),
  ];

  return getDatabase().then((db) => {
    return db
      .collection("tags")
      .find({ _id: { $in: uniqueTagIds } })
      .toArray();
  });
}

async function getGenresInfo(ownedGames) {
  let uniqueGenreIds = [...new Set(ownedGames.map((it) => it.genres).flat(1))];

  return getDatabase().then((db) => {
    return db
      .collection("genres")
      .find({ _id: { $in: uniqueGenreIds } })
      .toArray();
  });
}

async function getCategoriesInfo(ownedGames) {
  let uniqueCategoryIds = [
    ...new Set(ownedGames.map((it) => it.categories).flat(1)),
  ];

  return getDatabase().then((db) => {
    return db
      .collection("categories")
      .find({ _id: { $in: uniqueCategoryIds } })
      .toArray();
  });
}

function getRatingDiff(rating) {
  switch (rating) {
    case 1:
      return -1;
    case 2:
      return 1;
    default:
      return 0;
  }
}
