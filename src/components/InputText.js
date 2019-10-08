import React from 'react';

import './InputText.css'

const InputText = (props) => {

  return(
    <div>
      <label className="input-label">{ props.label }</label>
      <input
          type="text"
          className="input-text"
          value={ props.value }
          onChange={ props.onChange }
          placeholder={ props.placeholder } />
    </div>
  );
}

export default InputText;