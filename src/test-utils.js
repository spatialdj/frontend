import React from 'react';
import { render } from '@testing-library/react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import store from './store';

HelmetProvider.canUseDOM = false;

const AllProviders = ({ children }) => (
  <HelmetProvider>
    <Provider store={store}>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </Provider>
  </HelmetProvider>
);

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };
