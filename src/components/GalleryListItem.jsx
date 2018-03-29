import React, { Component } from 'react';
import TagImage from './TagImage';

const Status = {
  DEFAULT: 'default',
  HOVERED: 'hovered',
};

export default class GalleryListItem extends Component {
  state = {
    status: Status.DEFAULT,
  };

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
    const { url, favourited = false, onFavouriteClicked } = this.props;
    let tagImage = null;
    if (!favourited && this.isHovered()) {
      tagImage = <TagImage transparent onClick={() => onFavouriteClicked(favourited)} />;
    } else if (favourited) {
      tagImage = <TagImage onClick={() => onFavouriteClicked(favourited)} />;
    }

    return (
      <div
        role="link"
        className="gallery-list-item"
        onMouseEnter={this.onMouseEnter}
        onMouseOut={this.onMouseOut}
      >
        <img src={url} alt="Pic" />
        {tagImage}
      </div>
    );
  }
}
