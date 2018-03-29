import React from 'react';

const TAG_IMAGE_URL = '/images/tagimage.png';

export default ({ transparent, onClick }) => {
  const className = transparent ? 'img-transparent-50' : '';
  return (
    <img src={TAG_IMAGE_URL} className={className} onClick={onClick} alt="Tag" />
  );
};
