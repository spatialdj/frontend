import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import Header from 'components/Header';
import withAuth from 'components/hoc/withAuth';
import {
  PUBLIC_PAGE,
  LOGGED_IN_ONLY,
  PUBLIC_ONLY,
} from 'components/hoc/options';
// Pages
import Home from 'pages/Home';
import ErrorNotFound from 'pages/ErrorNotFound';
import Rooms from 'pages/Rooms';
// Fonts
import '@fontsource/poppins/100.css';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Header>
          <Switch>
            <Route exact path="/" component={withAuth(Home, PUBLIC_PAGE)} />
            <Route exact path="/rooms" component={withAuth(Rooms, PUBLIC_PAGE)} />
            <Route component={withAuth(ErrorNotFound, PUBLIC_PAGE)} />
          </Switch>
        </Header>
      </Router>
    </ChakraProvider>
  );
}

export default App;
