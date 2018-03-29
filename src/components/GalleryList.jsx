import React from 'react';
import GalleryListItem from './GalleryListItem';

export default ({ items, onItemFavouriteClicked }) => {
  return (
    <div className="container">
      <div className="row">
        {
          items.map(item => (
            <div className="col-3" key={item.id}>
              <GalleryListItem
                url={item.url}
                favourited={item.favourited}
                onFavouriteClicked={favourited => onItemFavouriteClicked(item.id, favourited)}
              />
            </div>
          ))
        }
      </div>
    </div>
  );
};
