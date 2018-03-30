import React, { Component } from 'react';

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
    console.log(e.target.value);
  }

  render() {
    return (
      <input
        type="text"
        value={this.state.search}
        onChange={this.onSearchChange}
        onKeyPress={this.onKeyPress}
      />
    );
  }
}
