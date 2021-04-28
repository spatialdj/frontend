import React, { useEffect, useContext } from 'react';
import { SocketContext } from 'contexts/socket';
import { Box } from '@chakra-ui/react';
import Bubble from 'components/Bubble';
import LeaveRoomButton from 'components/LeaveRoomButton';
import YoutubePlayer from 'components/YoutubePlayer';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Mock data
const data = [
  {
    image: 'https://picsum.photos/50',
    prefix: '👋',
    username: 'You',
    type: 'you',
    defaultPos: { x: getRandomInt(0, 600), y: getRandomInt(390, 600) },
  },
  {
    image: 'https://picsum.photos/51',
    prefix: '🎵',
    username: 'Song Picker',
    type: 'songPicker',
    defaultPos: { x: getRandomInt(0, 600), y: getRandomInt(390, 600) },
  },
  {
    image: 'https://picsum.photos/52',
    prefix: '',
    username: 'Test',
    type: 'other',
    defaultPos: { x: getRandomInt(0, 600), y: getRandomInt(390, 600) },
  },
  {
    image: 'https://picsum.photos/53',
    prefix: '',
    username: 'LONG ASS NAME BRUH WHY IS THIS NAME SO LONG WTF',
    type: 'other',
    defaultPos: { x: getRandomInt(0, 600), y: getRandomInt(390, 600) },
  },
];

function Room(props) {
  const socket = useContext(SocketContext);
  const roomId = props.match.params.id;

  useEffect(() => {
    socket.emit('join_room', roomId, response => {
      // TODO: handle join room
      console.log('join_room', response);
    });

    return () => {
      console.log('room unmounted');
      socket.emit('leave_room', response => {
        console.log('leave_room', response);
      });
      // TODO: disconnect from listeners
    };
  }, [socket, roomId]);

  return (
    <Box id="canvas" overflow="hidden" h="100vh" w="100%">
      <LeaveRoomButton />
      <YoutubePlayer id="LITzD9YjuS8" height="390" width="640" />
      {data.map(item => (
        <Bubble
          key={item.username}
          image={item.image}
          prefix={item.prefix}
          username={item.username}
          defaultPos={item.defaultPos}
          type={item.type}
        />
      ))}
    </Box>
  );
}

export default Room;
