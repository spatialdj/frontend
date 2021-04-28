import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from 'slices/userSlice';
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
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isAuth) {
    return (
      <Box zIndex="3">
        <MenuList>
          <MenuGroup title={username}>
            <Link to="/account">
              <MenuItem>My account</MenuItem>
            </Link>
          </MenuGroup>
          <MenuDivider />
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Box>
    );
  } else {
    return null;
  }
}

export default UserMenu;
