import React from "react";
import "./styles/Vid.css";

class Vid extends React.Component {
  constructor(props) {
    super(props);

    this.myDiv = React.createRef();
  }

  componentDidMount() {
    this.myDiv.current.addEventListener("click", () => {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });
  }

  adaptViewsFormat() {
    // Transforms the number of views so the number can be displayed in a more pleasant manner
    let views = this.props.viewCount;
    let adaptedViews;

    if (views > 1000 && views < 1000000) {
      adaptedViews = `${(views / 1000).toFixed(1)}K views`;
    } else if (views > 1000000) {
      adaptedViews = `${(views / 1000000).toFixed(1)}M views`;
    } else {
      adaptedViews = views;
    }
    return adaptedViews;
  }

  render() {
    return (
      <div
        className="vid"
        id="vid-wrapper"
        ref={this.myDiv}
        onClick={(e) => this.props.VidClicked(this.props.videoID)}
      >
        <img
          id="vid-thumbnail"
          border="0"
          alt="Missing"
          src={this.props.thumbnailID}
        />

        <div id="vid-displaydata" className="vid">
          <p className="vid" id="vid-title">
            {this.props.title}
          </p>
          <p className="vid" id="vid-likeDislikeRatio">
            Percentage Likes:{" "}
            <span
              id="span-percentage-rating"
              className={
                this.props.PercentageLikes >= 0.95
                  ? "good-rating"
                  : this.props.PercentageLikes >= 0.9 &&
                    this.props.PercentageLikes < 0.95
                  ? "medium-rating"
                  : "bad-rating"
              }
            >
              {this.props.PercentageLikes}
            </span>
          </p>
          <p className="vid" id="vid-viewCount">
            {this.adaptViewsFormat()}
          </p>
        </div>
      </div>
    );
  }
}

export default Vid;
