import React from 'react';
import './Header.css';

const menuCode = {
  SEARCH: 'search',
  FAVOURITE: 'favourite',
};

export default ({ selectedMenu = menuCode.SEARCH, favouriteCount = 0, onMenuClick }) => (
  <div className="header">
    <ul>
      <li className="logo-text">
        Galler<span>easy</span>
      </li>
      <li className="divider">
        |
      </li>
      <li style={{ cursor: 'pointer' }} className={selectedMenu === menuCode.SEARCH ? 'selected' : ''} onClick={() => onMenuClick(menuCode.SEARCH)}>
        Search
      </li>
      <li style={{ cursor: 'pointer' }} className={selectedMenu === menuCode.FAVOURITE ? 'selected' : ''} onClick={() => onMenuClick(menuCode.FAVOURITE)}>
        Favourites ({favouriteCount})
      </li>
    </ul>
  </div>
);
