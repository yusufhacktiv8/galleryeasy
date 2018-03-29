import React from 'react';
import GalleryListItem from './GalleryListItem';

export default ({ items }) => {
  return (
    <div className="container">
      <div className="row">
        {
          items.map(item => (
            <div className="col-3" key={item.id}>
              <GalleryListItem url={item.url} favourited={item.favourited} />
            </div>
          ))
        }
      </div>
    </div>
  );
};
