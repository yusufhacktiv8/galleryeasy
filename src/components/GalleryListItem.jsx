import React, { Component } from 'react';
import TagImage from './TagImage';

const Status = {
  DEFAULT: 'default',
  HOVERED: 'hovered',
};

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
      tagImage = <TagImage transparent />;
    } else if (favourited) {
      tagImage = <TagImage />;
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
