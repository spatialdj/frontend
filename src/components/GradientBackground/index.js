import React from 'react';
import { Box } from '@chakra-ui/react';
import './index.css';

function GradientBackground(props) {
  return (
    <Box>
      {props.children}
    </Box>
  );
}

export default GradientBackground;
