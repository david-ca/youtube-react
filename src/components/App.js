import React from "react";
import MySearchBar from "./MySearchBar";
import VideoPlayer from "./VideoPlayer";
import VideoList from "./VideoList";
import youtube from "../utils/apis/youtubeList";
import { initialState } from "../utils/initialState";

import {
  generateApiInput,
  generateArrayVideos,
} from "../utils/helperFunctions";
import "./styles/App.css";

class App extends React.Component {
  state = {
    listOfVideos: initialState.listOfVideos,
    currentVideo: initialState.currentVideo,
  };

  onFormSubmit = async (term) => {
    // First call to Youtube's API to get a list of videos' data,
    // such as their URLs, thumbnails, etc
    const responseList = await youtube.get("/search", {
      params: {
        part: "snippet",
        maxResults: 25,
        q: term,
      },
    });

    // Returns a string that serves as input for YouTube's statistics API
    let statiscticsApiInput = generateApiInput(responseList);

    // Second call to Youtube's API to get statistics for each video,
    // such as number of likes, dislikes, etc.
    const responseRatings = await youtube.get("/videos", {
      params: {
        part: "statistics",
        id: statiscticsApiInput,
      },
    });

    let arrayForComponent = generateArrayVideos(responseList, responseRatings);

    this.setState({
      listOfVideos: arrayForComponent,
      currentVideo: arrayForComponent[0].videoID,
    });
  };

  onVidClick = (videoID) => {
    this.setState({ currentVideo: videoID });
  };

  render() {
    return (
      <div className="app" id="app-wrapper">
        <div className="app" id="app-searchbar">
          <MySearchBar onSubmit={this.onFormSubmit.bind(this)} />
        </div>
        <div className="app" id="app-videoplayer">
          <VideoPlayer video={this.state.currentVideo} />
        </div>
        <div className="app" id="app-videolist">
          <VideoList
            videosData={this.state.listOfVideos}
            VidClicked={this.onVidClick}
          />
        </div>
      </div>
    );
  }
}

export default App;
