export const generateApiInput = (responseList) => {
  /*  ****************************************************************** */
  //  Returns a string that serves as input for YouTube's statistics API
  /*  ****************************************************************** */

  let arrayVideoIDs = responseList.data.items.map(function (x) {
    return x.id.videoId;
  });

  let concatStrings = "";
  for (let i = 0; i < arrayVideoIDs.length; i++) {
    concatStrings += arrayVideoIDs[i];
    if (i < arrayVideoIDs.length - 1) {
      concatStrings += ",";
    }
  }

  return concatStrings;
};

export const generateArrayVideos = (responseList, responseRatings) => {
  /*  ******************************************************************* */
  //  Returns an array with the video data necessary to render the
  //  VideoList and VideoPlayer components
  /*  ******************************************************************* */

  let arrayToBePassed = responseList.data.items.map(function (x) {
    let eachPos = {
      videoID: x.id.videoId,
      title: x.snippet.title,
      thumbnailID: x.snippet.thumbnails.default.url,
      description: x.snippet.description,
    };
    return eachPos;
  });

  for (let i = 0; i < arrayToBePassed.length; i++) {
    arrayToBePassed[i].likeCount =
      responseRatings.data.items[i].statistics.likeCount;
    arrayToBePassed[i].dislikeCount =
      responseRatings.data.items[i].statistics.dislikeCount;
    arrayToBePassed[i].PercentageLikes = (
      parseInt(arrayToBePassed[i].likeCount) /
      (parseInt(arrayToBePassed[i].likeCount) +
        parseInt(arrayToBePassed[i].dislikeCount))
    ).toFixed(2);
    arrayToBePassed[i].viewCount =
      responseRatings.data.items[i].statistics.viewCount;
  }

  // Transform NaN valuefrom videos without ratings to the string -"No Rating" -
  for (let i = 0; i < arrayToBePassed.length; i++) {
    if (isNaN(arrayToBePassed[i].PercentageLikes)) {
      arrayToBePassed[i].PercentageLikes = 0;
    }
  }

  // Order in descending order by the percentage of likes
  arrayToBePassed.sort(function (a, b) {
    return b.PercentageLikes - a.PercentageLikes;
  });

  return arrayToBePassed;
};
