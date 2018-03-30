import React from 'react';
import GalleryListItem from './GalleryListItem';
import './GalleryList.css';

export default ({ items, onItemFavouriteClicked }) => {
  return (
    <div className="grid">
      {
        items.map(item => (
          <div className="three columns" key={item.id}>
            <GalleryListItem
              url={item.url}
              favourited={item.favourited}
              onFavouriteClicked={favourited => onItemFavouriteClicked(item.id, favourited)}
            />
          </div>
        ))
      }
    </div>
  );
};
