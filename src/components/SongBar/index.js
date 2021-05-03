import React from 'react';
import { Drawer, Flex, useDisclosure } from '@chakra-ui/react';
import styled from '@emotion/styled';
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import SongDrawer from './components/SongDrawer';

const Bar = styled(Flex)`
  z-index: 1;
  height: 80px;
  width: 100%;
  bottom: 0;
  border-top-left-radius: 100;
  border-top-right-radius: 100;
`;

export default function SongBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentSong = 'Glace - "Ocean"';
  const nextSong = 'Darude - "Sandstorm"';
  const playlistName = 'Epic Bangers';

  return (
    <Bar
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={4}
      bgColor="rgba(12, 22, 45, 1)"
      color="white"
    >
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <SongDrawer handleOnClose={onClose} />
      </Drawer>
      <LeftSide
        openDrawer={onOpen}
        currentSong={currentSong}
        nextSong={nextSong}
      />
      <RightSide playlistName={playlistName} />
    </Bar>
  );
}
