import React, { Component } from 'react';

import Button from '../components/Button';

import { authEndpoint, clientId, redirectUri, scopes } from '../config';
import hash from "../hash";
import './Login.css'

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      buttonTitle: 'Entrar no Spotify',
      token: '',
    }

    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    let _token = hash.access_token;

    if (_token) {
      this.setState({
        token: _token
      });
    }
  }

  handleLogin() {
    window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
  }

  render() {
    return(
      <div className="container-login">
        {
          !this.state.token && (
            <Button buttonTitle={ this.state.buttonTitle } action={ this.handleLogin } />
          )
        }
      </div>
    );
  }
}

export default Login;