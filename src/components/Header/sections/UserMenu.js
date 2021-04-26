import React from 'react';
import { Box, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function UserMenu(props) {
  const { isAuth, username } = props;

  if (isAuth) {
    return (
      <Box zIndex="3">
        <MenuList>
          <MenuItem>{username}</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuDivider />
          <Link to="/login">
            <MenuItem>Logout</MenuItem>
          </Link>
        </MenuList>
      </Box>
    );
  } else {
    return null;
  }
}

export default UserMenu;
