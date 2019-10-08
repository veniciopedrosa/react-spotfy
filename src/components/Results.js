import React from 'react';
import { Link } from 'react-router-dom';

import './Results.css';

const Results = (props) => {

  return(
    <div>
      {
        <ul className="list-container">
          {
            props.results.map(item => {
              const albumId = item.type === 'album' ? item.id : item.album.id;
    
              return (
                <li className="album" key={ item.id } >
                  <Link to={{
                    pathname: `/albums/${ item.name }`,
                    state: {
                      id: albumId,
                      token: props.token
                    }
                  }}>
                    { <img className="album-image" src={ item.type === 'album' ? item.images[1].url : item.album.images[1].url } /> }
                  </Link>
                  <p className="album-title">{ item.name }</p>
                  {item.artists && <p className="album-subtitle">{ item.artists[0].name }</p>}
                </li>
              );
            })
          }
        </ul>
      }
    </div>
  );
}

export default Results;