import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { TiArrowBack } from 'react-icons/ti';

function LeaveRoomButton() {
  const history = useHistory();

  const handleLeaveRoom = () => {
    history.push('/rooms');
  };

  return (
    <Button
      zIndex="1"
      top="6px"
      leftIcon={<TiArrowBack />}
      variant="solid"
      onClick={handleLeaveRoom}
    >
      Leave room
    </Button>
  );
}

export default LeaveRoomButton;
