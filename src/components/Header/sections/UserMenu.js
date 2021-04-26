import React from 'react';
import { Box, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function UserMenu(props) {
  const { isAuth } = props;

  if (isAuth) {
    return (
      <Box zIndex="3">
        <MenuList>
          <MenuItem color="black">My account</MenuItem>
          <Link to="/orders">
            <MenuItem color="black">Orders</MenuItem>
          </Link>
          <MenuDivider />
          <Link to="/login">
            <MenuItem color="black">Logout</MenuItem>
          </Link>
        </MenuList>
      </Box>
    );
  } else {
    return null;
  }
}

export default UserMenu;
