import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Header from './components/Header';
import Error from './pages/Error';
import AlbumTracks from './pages/AlbumTracks';

const Routes = () => {
  return(
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/search" component={ Search } />
        <Route path="/albums/:handle" component={ AlbumTracks } />
        <Route exact path="*" component={ Error } />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;