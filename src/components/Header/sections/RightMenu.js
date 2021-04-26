import React from 'react';
import { Menu, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import UserIcon from './UserIcon';
import UserMenu from './UserMenu';
import ColorModeSwitcher from 'components/ColorModeSwitcher';

function RightMenu() {
  const user = useSelector(state => state.user);
  const { username, status, authenticated, profilePicture } = user;

  return (
    <Flex alignItems="center">
      <Menu>
        <UserIcon
          isLoaded={status !== 'loading' && status !== 'idle'}
          isAuth={authenticated}
          image={profilePicture}
        />
        <UserMenu isAuth={authenticated} username={username} />
      </Menu>
      <ColorModeSwitcher />
    </Flex>
  );
}

export default RightMenu;
