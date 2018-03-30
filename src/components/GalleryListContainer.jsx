import React, { Component } from 'react';
import axios from 'axios';

import Header from './Header';
import Footer from './Footer';
import SearchText from './SearchText';
import GalleryList from './GalleryList';
import Loading from './Loading';
import './GalleryListContainer.css';

const IMAGES_LIMIT = 8;
const IMAGES_API_URL = 'http://api.giphy.com/v1/gifs/search';
const imageTypes = { original: 'original', fixedHeight: 'fixed_height', fixedHeightStill: 'fixed_height_still' };
export default class GalleryListContainer extends Component {
  state = {
    images: [],
    favourites: [],
    loading: false,
  }

  onSearch = (search) => {
    if (search && search.length > 0) {
      this.fetchImages(search);
    }
  }

  fetchImages(search = '') {
    this.setState({
      loading: true,
    });
    axios.get(IMAGES_API_URL, {
      params: {
        q: search,
        api_key: process.env.REACT_APP_API_KEY,
        limit: IMAGES_LIMIT,
      },
    })
      .then((response) => {
        const images = response.data.data.map(obj => (
          {
            id: obj.id,
            url: obj.images[imageTypes.fixedHeightStill].url,
            favourited: this.state.favourites.indexOf(obj.id) !== -1,
          }
        ));
        this.setState({
          loading: false,
          images,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false,
        });
      });
  }

  toggleFavourite = (id, favourited) => {
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
      <div className="container">
        <div className="row">
          <Header selectedMenu="search" favouriteCount={this.state.favourites.length} />
        </div>
        <div className="text-search-container">
          <SearchText onSearch={this.onSearch} />
        </div>
        <div className="gallery-list-container">
          {
            this.state.loading ? <Loading description="Fetching images" /> : (<GalleryList
              items={images}
              onItemFavouriteClicked={this.toggleFavourite}
            />)
          }
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    );
  }
}
