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
    search: '',
    start: 0,
    images: [],
    favourites: [],
    loading: false,
    selectedMenu: 'search',
  }

  onSearch = (search) => {
    this.setState({
      search,
      start: 0,
    });
    if (search && search.length > 0) {
      this.setState({
        loading: true,
      });
      this.fetchImages(search, 0)
        .then((response) => {
          const images = response.data.data.map(obj => (
            {
              id: obj.id,
              url: obj.images[imageTypes.fixedHeightStill].url,
              favourited: this.state.favourites.map(f => f.id).indexOf(obj.id) !== -1,
            }
          ));
          this.setState({
            images,
          });
        });
    }
  }

  onMenuClick = (menu) => {
    this.setState({
      selectedMenu: menu,
    });
  }

  fetchMore = () => {
    this.fetchImages(this.state.search, this.state.start + IMAGES_LIMIT)
      .then((response) => {
        const images = response.data.data.map(obj => (
          {
            id: obj.id,
            url: obj.images[imageTypes.fixedHeightStill].url,
            favourited: this.state.favourites.map(f => f.id).indexOf(obj.id) !== -1,
          }
        ));
        this.setState({
          images: [...this.state.images, ...images],
          start: this.state.start + IMAGES_LIMIT,
        });
      });
  }

  fetchImages(search = '', offset = 0) {
    return new Promise((resolve, reject) => {
      axios.get(IMAGES_API_URL, {
        params: {
          q: search,
          api_key: process.env.REACT_APP_API_KEY,
          limit: IMAGES_LIMIT,
          offset,
        },
      })
        .then((response) => {
          this.setState({
            loading: false,
          }, () => {
            resolve(response);
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            loading: false,
          });
          reject(error);
        });
    });
  }

  toggleFavourite = (id, favourited) => {
    if (!favourited) {
      if (this.state.favourites.map(obj => obj.id).indexOf(id) === -1) {
        this.setState({
          favourites: [...this.state.favourites, { ...this.state.images.find(obj => obj.id === id), favourited: true }],
        });
      }
    } else {
      const tempFavourites = [...this.state.favourites];
      const index = tempFavourites.map(obj => obj.id).indexOf(id);
      if (index !== -1) {
        tempFavourites.splice(index, 1);
        this.setState({
          favourites: tempFavourites,
        });
      }
    }

    // Modify images favourited props
    const tempImages = [...this.state.images];
    const image = tempImages.find(obj => obj.id === id);
    if (image) {
      image.favourited = !favourited;
      this.setState({
        images: tempImages,
      });
    }
  }

  render() {
    const { images, favourites } = this.state;
    let dataSource = images;
    if (this.state.selectedMenu === 'favourite') {
      dataSource = favourites;
    }
    return (
      <div className="container">
        <div className="row">
          <Header
            selectedMenu={this.state.selectedMenu}
            favouriteCount={this.state.favourites.length}
            onMenuClick={this.onMenuClick}
          />
        </div>
        <div className="text-search-container">
          {
            this.state.selectedMenu === 'search' ? (
              <SearchText onSearch={this.onSearch} />
            ) : null
          }
        </div>
        <div className="gallery-list-container">
          {
            this.state.loading ? <Loading description="Fetching images" /> : (<GalleryList
              items={dataSource}
              onItemFavouriteClicked={this.toggleFavourite}
            />)
          }
        </div>
        <div className="fetch-more-button-container">
          {
            (this.state.images.length >= IMAGES_LIMIT) && (this.state.selectedMenu === 'search') ? (
              <input
                className="fetch-more-button"
                type="button"
                value="Fetch More"
                onClick={this.fetchMore}
              />
            ) : null
          }
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    );
  }
}
