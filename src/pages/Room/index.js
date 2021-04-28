import React from 'react';
import { Box } from '@chakra-ui/react';
import Bubble from 'components/Bubble';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Mock data
const data = [
  {
    image: 'https://picsum.photos/50',
    prefix: '👋',
    username: 'You',
    type: 'you',
    defaultPos: { x: getRandomInt(500), y: getRandomInt(500) },
  },
  {
    image: 'https://picsum.photos/51',
    prefix: '🎵',
    username: 'Song Picker',
    type: 'songPicker',
    defaultPos: { x: getRandomInt(500), y: getRandomInt(500) },
  },
  {
    image: 'https://picsum.photos/52',
    prefix: '',
    username: 'Test',
    type: 'other',
    defaultPos: { x: getRandomInt(500), y: getRandomInt(500) },
  },
  {
    image: 'https://picsum.photos/53',
    prefix: '',
    username: 'LONG ASS NAME BRUH WHY IS THIS NAME SO LONG WTF',
    type: 'other',
    defaultPos: { x: getRandomInt(500), y: getRandomInt(500) },
  },
];

function Room() {

  return (
    <Box id="canvas" overflow="hidden" h="100vh" w="100%">
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
