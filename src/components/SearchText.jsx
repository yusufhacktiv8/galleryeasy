import React, { Component } from 'react';
import './SearchText.css';

export default class SearchText extends Component {
  state = {
    search: '',
  }

  onSearchChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.onSearch(this.state.search);
    }
  }

  render() {
    return (
      <input
        type="text"
        value={this.state.search}
        onChange={this.onSearchChange}
        onKeyPress={this.onKeyPress}
        className="search-text"
        placeholder="Start searching for images!"
      />
    );
  }
}
