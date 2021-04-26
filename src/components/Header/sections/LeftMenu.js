import React from 'react';
import { Heading, Flex, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from './logo.png';

function LeftMenu() {
  return (
    <Flex align="center">
      <Image src={logo} w="32px" mr={4} />
      <Heading color="white" as="h1" size="lg">
        <Link to="/">SPATIAL.DJ</Link>
      </Heading>
    </Flex>
  );
}

export default LeftMenu;
