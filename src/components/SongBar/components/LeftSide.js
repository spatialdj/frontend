import React from 'react';
import { useSelector } from 'react-redux';
import he from 'he';
import { HStack, IconButton, Text, VStack, Tag, Flex } from '@chakra-ui/react';
import { FaChevronUp } from 'react-icons/fa';
import './marquee.css';

function LeftSide(props) {
  const authenticated = useSelector(state => state.user.authenticated);
  const playlist = useSelector(state => state.playlists);
  const { playlists, selectedPlaylist } = playlist;

  if (!authenticated) {
    return <Tag size="lg">👀 SPECTATOR MODE</Tag>;
  }

  return (
    <HStack spacing="2rem">
      <IconButton
        variant="outline"
        onClick={props.openDrawer}
        icon={<FaChevronUp />}
      />
      {selectedPlaylist == null || playlists?.[selectedPlaylist] == null ? (
        <Text>No playlist selected</Text>
      ) : (
        <VStack align="left" spacing={0}>
          <Flex fontWeight="bold">
            <Text mr={2}>Selected playlist:</Text>
            <Flex w="300px" overflow="hidden">
              <Text className="marquee" whiteSpace="nowrap">
                {he.decode(playlists?.[selectedPlaylist]?.name ?? '')}
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <Text mr={2}>Your next song:</Text>
            <Flex w="300px" overflow="hidden">
              <Text className="marquee" whiteSpace="nowrap">
                {he.decode(
                  playlists?.[selectedPlaylist]?.queue?.[0]?.title ??
                    'None selected'
                )}
              </Text>
            </Flex>
          </Flex>
        </VStack>
      )}
    </HStack>
  );
}

export default LeftSide;
