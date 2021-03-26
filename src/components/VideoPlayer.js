import React from "react";
import "./styles/VideoPlayer.css";

class VideoPlayer extends React.Component {
  render() {
    return (
      <div id="videoPlayer-wrapper">
        <div id="iframeContainer">
          <iframe
            id="myframe"
            src={`https://www.youtube.com/embed/${this.props.video}`}
            frameBorder="0"
            title=" "
            allowFullScreen="yes"
          ></iframe>
        </div>
      </div>
    );
  }
}

export default VideoPlayer;
