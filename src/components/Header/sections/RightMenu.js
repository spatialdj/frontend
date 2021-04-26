import React from 'react';
import { Menu, Flex } from '@chakra-ui/react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import UserIcon from './UserIcon';
import UserMenu from './UserMenu';

function RightMenu(props) {
  const { username, avatar, status, authenticated } = props;

  return (
    <Flex alignItems="center">
      <Menu isLazy>
        <UserIcon
          isLoaded={status === 'success'}
          isAuth={authenticated}
          image={avatar}
        />
        <UserMenu isAuth={authenticated} username={username} />
      </Menu>
    </Flex>
  );
}

const mapStateToProps = state => {
  return {
    username: state.username,
    avatar: state.profile_pic,
    status: state.status,
    authenticated: state.authenticated,
  };
};

export default withRouter(connect(mapStateToProps)(RightMenu));
