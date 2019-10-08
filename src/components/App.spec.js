import React from 'react';
import { mount } from 'enzyme';

import App from './App';

describe('<App>', () => {
  it('renders the correct text', () => {
    const text = 'Works!!!';
    const wrapper = mount(
      <App />
    );
    const p = wrapper.find('p');

    expect(p.text()).toBe(text);
  });
});