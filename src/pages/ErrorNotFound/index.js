import React from 'react';
import { Heading, Text, Flex } from '@chakra-ui/react';

function index() {
  return (
    <div>
      <Flex alignItems="center" flexDirection="column" m="10%">
        <Heading>404</Heading>
        <Text>Page not found.</Text>
      </Flex>
    </div>
  );
}

export default index;
