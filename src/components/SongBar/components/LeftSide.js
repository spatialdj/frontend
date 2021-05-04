import React from 'react';
import { useSelector } from 'react-redux';
import { HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { FaChevronUp } from 'react-icons/fa';

function LeftSide(props) {
  const authenticated = useSelector(state => state.user.authenticated);
  return (
    <HStack spacing="2rem">
      {authenticated ? (
        <IconButton
          variant="outline"
          onClick={props.openDrawer}
          icon={<FaChevronUp />}
        />
      ) : null}
      <VStack align="left" spacing={0}>
        <Text fontWeight="bold">Now Playing: {props.currentSong}</Text>
        <Text>Next Up: {props.nextSong}</Text>
      </VStack>
    </HStack>
  );
}

export default LeftSide;
