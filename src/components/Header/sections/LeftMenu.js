import React from 'react';
import { Heading, Flex, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from './logo.png';

function LeftMenu() {
  return (
    <Flex align="center">
      <Image src={logo} alt="Logo" w="32px" mr={4} />
      <Heading color="white" as="h1" size="lg">
        <Link to="/" data-testid="header-text">
          SPATIAL.DJ
        </Link>
      </Heading>
    </Flex>
  );
}

export default LeftMenu;
