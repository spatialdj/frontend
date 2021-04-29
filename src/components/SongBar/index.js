import React, { useState } from 'react';
import {
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  DrawerBody,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import styled from '@emotion/styled';
import LeftSide from './sections/LeftSide';
import RightSide from './sections/RightSide';

const Bar = styled(Flex)`
  position: absolute;
  width: 100%;
  bottom: 0;
  border-top-left-radius: 100;
  border-top-right-radius: 100;
`;

export default function SongBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // TODO: connect volume to youtube player? how?
  const [volume, setVolume] = useState(50);

  // TODO: get song values
  const currentSong = 'Glace - "Ocean"';
  const nextSong = 'Darude - "Sandstorm"';
  const playlistName = 'Epic Bangers';

  // TODO: figure out how drawer thing works

  return (
    <Bar
      position="absolute"
      zIndex="1"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bgColor="rgba(12, 22, 45, 1)"
      color="white"
    >
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent minH="50%">
            <DrawerHeader borderBottomWidth="1px">
              <IconButton
                variant="outline"
                onClick={onClose}
                icon={isOpen ? <FaChevronDown /> : <FaChevronUp />}
                mr="2rem"
              />
              Playlist Manager
            </DrawerHeader>
            <DrawerBody>
              <p>uhhhh work in progress dont click this ...</p>
              <p>uhhhh work in progress dont click this ...</p>
              <p>uhhhh work in progress dont click this ...</p>
              <p>uhhhh work in progress dont click this ...</p>
              <p>uhhhh work in progress dont click this ...</p>
              <p>uhhhh work in progress dont click this ...</p>
              <p>uhhhh work in progress dont click this ...</p>
              <p>uhhhh work in progress dont click this ...</p>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <LeftSide
        openDrawer={onOpen}
        isDrawerOpen={isOpen}
        currentSong={currentSong}
        nextSong={nextSong}
      />
      <RightSide
        changeVolume={val => setVolume(val)}
        volume={volume}
        playlistName={playlistName}
      />
    </Bar>
  );
}
