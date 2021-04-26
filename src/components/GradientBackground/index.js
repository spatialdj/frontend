import React from 'react';
import { Box } from '@chakra-ui/react';

function GradientBackground(props) {
  return (
    <Box
      h="calc(100vh - 72px)"
      backgroundImage="url('./gradient.png')"
      backgroundColor="#040D21"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      {props.children}
    </Box>
  );
}

export default GradientBackground;
