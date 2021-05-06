import React, { useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { joinQueue, leaveQueue } from 'slices/queueSlice';
import { SocketContext } from 'contexts/socket';
import { Button } from '@chakra-ui/react';

function JoinQueueButton() {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const inQueue = useSelector(state => state.queue.inQueue);
  const currentUser = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    socket.on('user_join_queue', (position, userFragment) => {
      if (userFragment.username === currentUser.username) {
        dispatch(joinQueue());
        setIsLoading(false);
      } else {
        // TODO: handle join queue for other users
      }
      console.log('user_join_queue', { position, userFragment });
    });

    socket.on('user_leave_queue', username => {
      if (username === currentUser.username) {
        dispatch(leaveQueue());
        setIsLoading(false);
      } else {
        // TODO: handle leave queue for other users
      }
      console.log('user_leave_queue', username);
    });

    return () => {
      socket.removeAllListeners('user_join_queue');
      socket.removeAllListeners('user_leave_queue');
    };
  }, [socket, dispatch, currentUser]);

  const handleQueue = () => {
    // Artificial timeout
    setIsLoading(true);
    setTimeout(() => {
      if (inQueue) {
        socket.emit('leave_queue');
      } else {
        socket.emit('join_queue');
      }
    }, 100);
  };

  return (
    <Button
      onClick={handleQueue}
      isLoading={isLoading}
      size="lg"
      colorScheme="blue"
      position="absolute"
      bottom="80px"
      left="0"
      right="0"
      m="auto"
    >
      {inQueue ? 'Leave Queue' : 'Join Queue'}
    </Button>
  );
}

export default JoinQueueButton;
