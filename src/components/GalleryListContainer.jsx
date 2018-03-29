import React, { Component } from 'react';
import axios from 'axios';

import GalleryList from './GalleryList';

const IMAGES_LIMIT = 8;
const API_KEY = '1MzUguSzVS4rrWw2oS94hP5b7bslWAFq';
const IMAGES_API_URL = 'http://api.giphy.com/v1/gifs/search';
export default class GalleryListContainer extends Component {
  state = {
    images: [],
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
            favourited: false,
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

  render() {
    const { images } = this.state;
    return (
      <GalleryList
        items={images}
        onItemFavouriteClicked={(id, favourited) => { console.log(id, favourited); }}
      />
    );
  }
}
