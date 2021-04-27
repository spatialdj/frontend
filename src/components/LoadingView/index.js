import React from 'react';
import {Box, Spinner} from '@chakra-ui/react';

function LoadingView() {
  return (
    <Box h="80vh" display="flex" justifyContent="center" alignItems="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.300"
        size="xl" />
    </Box>
  );
}

export default LoadingView;