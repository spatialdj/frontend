import React, { useEffect, useContext, useState } from 'react';
import { SocketContext } from 'contexts/socket';
import { useSelector } from 'react-redux';
import { Box, useToast } from '@chakra-ui/react';
import Bubble from 'components/Bubble';
import ClientBubble from 'components/ClientBubble';
import LeaveRoomButton from 'components/LeaveRoomButton';
import YoutubePlayer from 'components/YoutubePlayer';

// For testing
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Room(props) {
  const socket = useContext(SocketContext);
  const [bubblesData, setBubblesData] = useState([]);
  const user = useSelector(state => state.user);
  const toast = useToast();
  const roomId = props.match.params.id;

  useEffect(() => {
    socket.emit('join_room', roomId, response => {
      // TODO: handle join room
      console.log('join_room', response);
    });

    // Listen to user joining room
    socket.on('user_join', response => {
      const { username, profilePicture } = response;
      handleJoin(username, profilePicture);
      console.log('user_join', response);
    });

    // Listen to user leaving room
    socket.on('user_leave', username => {
      handleLeave(username);
      console.log('user_leave', username);
    });

    // Listen to new host transfewr
    socket.on('new_host', response => {
      const { username } = response;
      handleTransferHost(username);
      console.log('new_host', response);
    });

    // Listen to room closed
    socket.on('room_closed', () => {
      handleRoomClosed();
      console.log('room_closed');
    });

    return () => {
      console.log('room unmounted');
      socket.emit('leave_room', response => {
        console.log('leave_room', response);
      });
      // TODO: disconnect from listeners
      socket.removeAllListeners([
        'user_join',
        'user_leave',
        'new_host',
        'room_closed',
      ]);
    };
  }, [socket, roomId]);

  const handleJoin = (username, image) => {
    toast({
      title: `${username} joined`,
      status: 'info',
      variant: 'top-accent',
      isClosable: true,
      duration: 5000,
    });
    setBubblesData(data => [
      ...data,
      {
        image: image,
        prefix: '',
        username: username,
        type: 'other',
        position: { x: getRandomInt(0, 600), y: getRandomInt(390, 600) },
      },
    ]);
  };

  const handleLeave = username => {
    toast({
      title: `${username} left`,
      status: 'error',
      variant: 'top-accent',
      isClosable: true,
      duration: 5000,
    });
    setBubblesData(data => data.filter(user => user.username !== username));
  };

  const handleTransferHost = username => {
    toast({
      title: `${username} is the host now!`,
      status: 'warning',
      variant: 'top-accent',
      isClosable: true,
      duration: 5000,
    });
    // TODO: change bubblesData to reflect host?
  };

  const handleRoomClosed = () => {
    // TODO: implement room closed
  };

  return (
    <Box id="canvas" overflow="hidden" h="100vh" w="100%">
      <LeaveRoomButton />
      <YoutubePlayer id="LITzD9YjuS8" height="390" width="640" />
      {bubblesData.map(item => (
        <Bubble
          key={item.username}
          image={item.image}
          prefix={item.prefix}
          username={item.username}
          position={item.position}
          type={item.type}
        />
      ))}
      <ClientBubble
        image={user?.profilePicture}
        prefix="👋"
        username={user?.username}
      />
    </Box>
  );
}

export default Room;
