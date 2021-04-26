import React from 'react';
import { render } from '@testing-library/react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import store from './store';

const AllProviders = ({ children }) => (
  <Provider store={store}>
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  </Provider>
);

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };
