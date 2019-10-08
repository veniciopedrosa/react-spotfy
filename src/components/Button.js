import React from 'react';

import './Button.css';

const Button = (props) => {
  return (
    <div>
      <button className="button" type="button" onClick={ props.action }>
        { props.buttonTitle }
      </button>
    </div>
  );
}
export default Button;