import React from "react";
import Vid from "./Vid";

class VideoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { videos: [] };
  }

  render() {
    const vids = this.props.videosData.map((video) => {
      return (
        <Vid
          VidClicked={this.props.VidClicked}
          key={video.videoID}
          videoID={video.videoID}
          title={video.title}
          thumbnailID={video.thumbnailID}
          viewCount={video.viewCount}
          PercentageLikes={video.PercentageLikes}
        />
      );
    });

    return <div>{vids}</div>;
  }
}

export default VideoList;
