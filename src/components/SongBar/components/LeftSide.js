import React from 'react';
import { HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { FaChevronUp } from 'react-icons/fa';

function LeftSide(props) {
  return (
    <HStack spacing="2rem">
      <IconButton
        variant="outline"
        onClick={props.openDrawer}
        icon={<FaChevronUp />}
      />
      <VStack align="left" spacing={0}>
        <Text fontWeight="bold">Now Playing: {props.currentSong}</Text>
        <Text>Next Up: {props.nextSong}</Text>
      </VStack>
    </HStack>
  );
}

export default LeftSide;
