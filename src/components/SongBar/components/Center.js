import React from 'react';
import { useSelector } from 'react-redux';
import JoinQueueButton from 'components/JoinQueueButton';

function Center() {
  const authenticated = useSelector(state => state.user.authenticated);

  if (authenticated) {
    return <JoinQueueButton />;
  } else {
    return null;
  }
}

export default Center;
