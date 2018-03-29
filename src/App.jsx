import React, { Component } from 'react';
import './App.css';
import GalleryListContainer from './components/GalleryListContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GalleryListContainer />
      </div>
    );
  }
}

export default App;
