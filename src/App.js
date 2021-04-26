import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Header from 'components/Header';
// Pages
import Home from 'pages/Home';
import ErrorNotFound from 'pages/ErrorNotFound';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Header>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={ErrorNotFound} />
          </Switch>
        </Header>
      </Router>
    </ChakraProvider>
  );
}

export default App;
