import React, { Component } from 'react';

const Status = {
  DEFAULT: 'default',
  HOVERED: 'hovered',
};
const TAG_IMAGE_URL = '/tagimage.png';

export default class GalleryListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: Status.DEFAULT,
    };
  }

  onMouseEnter = () => {
    this.setState({
      status: Status.HOVERED,
    });
  }

  onMouseOut = () => {
    this.setState({
      status: Status.DEFAULT,
    });
  }

  isHovered() {
    return this.state.status === Status.HOVERED;
  }

  render() {
    const { url, favourited } = this.props;
    let tagImage = null;
    if (!favourited && this.isHovered()) {
      tagImage = <img url={TAG_IMAGE_URL} className="img-transparent-50" />;
    } else if (favourited) {
      tagImage = <img url={TAG_IMAGE_URL} />;
    }

    return (
      <div
        role="link"
        className="gallery-list-item"
        onMouseEnter={this.onMouseEnter}
        onMouseOut={this.onMouseOut}
      >
        <img url={url} />
        {tagImage}
      </div>
    );
  }
}
