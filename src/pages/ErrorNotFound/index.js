import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Heading, Text, Flex } from '@chakra-ui/react';

function index() {
  return (
    <Flex alignItems="center" flexDirection="column" m="10%">
      <Helmet>
        <title>404 - Spatial.dj</title>
      </Helmet>
      <Heading>404</Heading>
      <Text>Page not found.</Text>
    </Flex>
  );
}

export default index;
