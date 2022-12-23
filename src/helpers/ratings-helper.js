// Public functions
export async function getRatings(ratedGames) {
  let developerRatings = [];
  let publisherRatings = [];
  let tagRatings = [];
  let genreRatings = [];
  let categoryRatings = [];

  // Loop through each games and populate ratings array with {id, rating, count} objects
  ratedGames.forEach((game) => {
    // Developer Ratings
    game.developers?.forEach((developer) => {
      addToRatingsArray(developerRatings, developer, game.rating);
    });

    // Publisher Ratings
    game.publishers?.forEach((publisher) => {
      addToRatingsArray(publisherRatings, publisher, game.rating);
    });

    // Tag Ratings
    game.tags?.forEach((tag) => {
      addToRatingsArray(tagRatings, tag, game.rating);
    });

    // Genre Ratings
    game.genres?.forEach((genre) => {
      addToRatingsArray(genreRatings, genre, game.rating);
    });

    // Category Ratings
    game.categories?.forEach((category) => {
      addToRatingsArray(categoryRatings, category, game.rating);
    });
  });

  return {
    developerRatings: reformat(developerRatings),
    publisherRatings: reformat(publisherRatings),
    tagRatings: reformat(tagRatings),
    genreRatings: reformat(genreRatings),
    categoryRatings: reformat(categoryRatings),
  };
}

// Private functions

function addToRatingsArray(ratingsArray, obj, rating) {
  const i = ratingsArray.findIndex((it) => it.name == obj);
  if (i > -1) {
    ratingsArray[i].rating += getRatingDiff(rating);
  } else {
    ratingsArray.push({
      name: obj,
      rating: getRatingDiff(rating),
    });
  }
}

function reformat(ratingsArray) {
  if (ratingsArray.length == 0) return;

  return ratingsArray
    .filter((it) => it.rating != 0)
    .sort((a, b) => b.rating - a.rating);
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
