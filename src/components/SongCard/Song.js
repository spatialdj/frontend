import React from 'react';
import { Box, Text } from '@chakra-ui/react';

function Song({ data }) {
  const { title, duration, thumbnails } = data;
  return (
    <Box>
      <Text>title</Text>
    </Box>
  );
}

export default Song;
