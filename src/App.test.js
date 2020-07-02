import React from 'react';
import App from './App';
import '@testing-library/jest-dom'
import configureMockStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import { mount } from 'enzyme'

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


const mockStore = configureMockStore();
const store = mockStore({});

describe('App', () => {

  test('button is disabled', () => {

    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    )

    expect(wrapper.find("button").is("[disabled]")).toBe(true);

  })

})

