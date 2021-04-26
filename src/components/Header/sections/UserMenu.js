import React from 'react';
import {
  Box,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function UserMenu(props) {
  const { isAuth, username } = props;

  if (isAuth) {
    return (
      <Box zIndex="3">
        <MenuList>
          <MenuGroup title={username}>
            <MenuItem>My account</MenuItem>
          </MenuGroup>
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
