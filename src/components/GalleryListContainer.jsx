import React, { Component } from 'react';
import axios from 'axios';

import GalleryList from './GalleryList';

const IMAGES_LIMIT = 8;
const API_KEY = '1MzUguSzVS4rrWw2oS94hP5b7bslWAFq';
const IMAGES_API_URL = 'http://api.giphy.com/v1/gifs/search';
export default class GalleryListContainer extends Component {
  state = {
    images: [],
    favourites: [],
  }

  componentDidMount() {
    this.fetchImages();
  }

  fetchImages() {
    axios.get(IMAGES_API_URL, {
      params: {
        q: 'cat',
        api_key: API_KEY,
        limit: IMAGES_LIMIT,
      },
    })
      .then((response) => {
        const images = response.data.data.map(obj => (
          {
            id: obj.id,
            url: obj.images.original.url,
            favourited: this.state.favourites.indexOf(obj.id) !== -1,
          }
        ));
        this.setState({
          images,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  toggleFavourite(id, favourited) {
    if (!favourited) {
      if (this.state.favourites.indexOf(id) === -1) {
        this.setState({
          favourites: [...this.state.favourites, id],
        });
      }
    } else {
      const tempFavourites = [...this.state.favourites];
      const index = tempFavourites.indexOf(id);
      if (index !== -1) {
        tempFavourites.splice(index, 1);
        this.setState({
          favourites: tempFavourites,
        });
      }
    }
    const tempImages = this.state.images;
    const image = tempImages.find(obj => obj.id === id);
    image.favourited = !favourited;
    this.setState({
      images: tempImages,
    });
  }

  render() {
    const { images } = this.state;
    return (
      <GalleryList
        items={images}
        onItemFavouriteClicked={(id, favourited) => { this.toggleFavourite(id, favourited); }}
      />
    );
  }
}
