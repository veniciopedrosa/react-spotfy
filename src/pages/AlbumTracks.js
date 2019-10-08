import React, { Component } from 'react';

import IconPlay from '../components/Icons/IconPlay';
import IconPause from '../components/Icons/IconPause';

import './AlbumTracks.css';

class AlbumTracks extends Component {
  audioObject = null;
  
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      image: '',
      artist: '',
      tracks: [],
    }
    this.play = this.play.bind(this);
    this.handleIsPlaying = this.handleIsPlaying.bind(this);
  }

  componentDidMount () {
    const { id } = this.props.location.state;
    const token = window.localStorage.getItem('token');

    if (id) {
      const url = `https://api.spotify.com/v1/albums/${id}`;
      fetch(url,{
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(response => response.json())
      .then(data => {
        this.setState({
          name: data.name,
          image: data.images[1].url,
          tracks: data.tracks.items,
          artist: data.artists[0].name
        })
      });
    }
  }

  play(track) {
    if (track.isPlaying) {
        this.audioObject.pause();
    } else {
      if (this.audioObject) {
          this.audioObject.pause();
      }
      this.audioObject = new Audio(track.preview_url);
      this.audioObject.play();
      this.handleIsPlaying(track, true);
      this.audioObject.addEventListener('ended', () => {
        this.handleIsPlaying(track, false);
      });
      this.audioObject.addEventListener('pause', () => {
        this.handleIsPlaying(track, false);
      });
    }
  }

  handleIsPlaying(track, isPlaying) {
    this.state.tracks
    .find(val => val.id === track.id).isPlaying = isPlaying;

    this.setState({tracks: this.state.tracks});
  }

  render() {
    return(
      <div className="album-container">
        <div className="album-info">
          { this.state.image && <img src={ this.state.image } /> }
          { this.state.name && <strong>{ this.state.name }</strong> }
          { this.state.artist && <p>Album by { this.state.artist }</p> }
        </div>
        {
          <ul className="list-tracks">
            {this.state.tracks && this.state.tracks.map(track => {
                return (
                <li key={ track.id } className="track">
                  <span className="track-info">
                    { track.name }
                  </span>

                  <span className="track-control" onClick={() => this.play(track)}>
                    { !track.isPlaying && <IconPlay /> }
                    { track.isPlaying && <IconPause /> }
                  </span>
                </li>)
              })
            }
          </ul>
        }
      </div>
    );
  }
}

export default AlbumTracks;