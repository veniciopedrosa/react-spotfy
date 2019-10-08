import React, { Component } from 'react';

import InputText from '../components/InputText';
import Results from '../components/Results';

import hash from "../hash";
import './Search.css'

class Search extends Component {
  token = '';
  timeout = null;

  constructor(props) {
    super(props);

    this.state = {
      inputLabel: 'Busque por artistas, álbuns ou músicas',
      inputPlaceholder: 'Comece a escrever...',
      results: []
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.handleResults = this.handleResults.bind(this);
  }

  componentDidMount() {
    let token = hash.access_token;

    if (token) {
      window.localStorage.setItem('token', token);
    }
    this.token = window.localStorage.getItem('token');
  }

  handleSearch(ev) {
    clearTimeout(this.timeout);
    const value = ev.target.value;

    this.timeout = setTimeout(() => {
      if (value) {
        const url = `https://api.spotify.com/v1/search?q=${value}&type=track%2Calbum&limit=5&offset=5`;
        fetch(url,{
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        }).then(response => response.json())
        .then(data => {
          this.handleResults(data);
        });
      } else {
        this.setState({results: []})
      }
    }, 500);
  }

  handleResults(res) {
    if (res) {
      let newResult = [...res.albums.items, ...res.tracks.items];
      this.setState({results: newResult});
    }
  }

  render() {
    return(
      <div className="container">
        {
          <InputText 
            label={ this.state.inputLabel }
            onChange={ this.handleSearch }
            placeholder={ this.state.inputPlaceholder } />
        }

        {this.state.results && (
          <Results results={this.state.results} />
        )}
      </div>
    );
  }
}

export default Search;