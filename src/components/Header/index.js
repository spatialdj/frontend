import React from 'react';
import LeftMenu from './sections/LeftMenu';
import RightMenu from './sections/RightMenu';
import { Flex } from '@chakra-ui/react';

function Header({ children }) {
  return (
    <div>
      <Flex
        position="sticky"
        zIndex="1"
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1rem"
        bgColor="rgba(12, 22, 45, 1)"
        color="white"
      >
        <LeftMenu />
        <RightMenu />
      </Flex>
      {children}
    </div>
  );
}

export default Header;
