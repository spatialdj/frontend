import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';

// Pages
import Home from 'pages/Home';
import ErrorNotFound from 'pages/ErrorNotFound';
import Rooms from 'pages/Rooms';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/rooms" component={Rooms} />
          <Route component={ErrorNotFound} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
