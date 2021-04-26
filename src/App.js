import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import Header from 'components/Header';
// Pages
import Home from 'pages/Home';
import ErrorNotFound from 'pages/ErrorNotFound';
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
            <Route exact path="/" component={Home} />
            <Route component={ErrorNotFound} />
          </Switch>
        </Header>
      </Router>
    </ChakraProvider>
  );
}

export default App;
