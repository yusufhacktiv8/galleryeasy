import React from 'react';

const TAG_IMAGE_URL = '/images/tagimage.png';

export default ({ transparent, onClick }) => {
  const className = transparent ? 'tag-img transparent-70' : 'tag-img';
  return (
    <img src={TAG_IMAGE_URL} className={className} onClick={onClick} alt="Tag" />
  );
};
