import React from 'react';
import { Avatar, MenuButton, HStack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const UserIcon = props => {
  const { isLoaded, isAuth, image } = props;

  if (!isLoaded) {
    return null;
  } else if (isAuth) {
    // all logged in users have this (including admin)
    return (
      <MenuButton display="flex" alignItems="center">
        <Avatar size="sm" src={image} />
      </MenuButton>
    );
  } else {
    return (
      <HStack spacing={8}>
        <Link to="/login">
          <Text colorScheme="blue">Login</Text>
        </Link>
        <Link to="/login">
          <Text colorScheme="blue">Register</Text>
        </Link>
      </HStack>
    );
  }
};

export default UserIcon;
