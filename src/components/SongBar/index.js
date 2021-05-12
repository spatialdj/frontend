import React from 'react';
import { Drawer, Flex, useDisclosure, Spacer } from '@chakra-ui/react';
import styled from '@emotion/styled';
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import Center from './components/Center';
import SongDrawer from './components/SongDrawer';
import ChatBox from 'components/ChatBox';

const Bar = styled(Flex)`
  z-index: 1;
  width: 100%;
  bottom: 0;
  border-top-left-radius: 100;
  border-top-right-radius: 100;
`;

export default function SongBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex flexDirection="column" alignItems="end" position="absolute" left={0} right={0} bottom={0}>
      <ChatBox />
      <Bar
        position="relative"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={4}
        bgColor="rgba(14, 22, 40, 0.85)"
        color="white"
      >
        <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
          <SongDrawer handleOnClose={onClose} />
        </Drawer>
        <LeftSide openDrawer={onOpen} />
        <Center />
        <RightSide />
      </Bar>
    </Flex>
  );
}
