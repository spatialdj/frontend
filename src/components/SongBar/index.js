import React, { useState } from 'react';
import {
  Flex,
  Box,
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
import SongSearch from '../SongSearch';
import SongList from '../SongList';
import { search } from '../../services/song.js';

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
  // TODO: connect volume to youtube player? how?
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  // TODO: get song values
  const currentSong = 'Glace - "Ocean"';
  const nextSong = 'Darude - "Sandstorm"';
  const playlistName = 'Epic Bangers';

  // TODO: figure out how drawer thing works
  const searchSongs = async e => {
    if (e.key === 'Enter') {
      const res = await search(query);
      setResults(res.data.data.videos);
    }
  };
  const handleChange = e => {
    //

    setQuery(e.target.value);
  };
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
              <Flex>
                <Box my="4">
                  <p>uhhhh work in progress dont click this ...</p>
                  <p>uhhhh work in progress dont click this ...</p>
                  <p>uhhhh work in progress dont click this ...</p>
                  <p>uhhhh work in progress dont click this ...</p>
                  <p>uhhhh work in progress dont click this ...</p>
                  <p>uhhhh work in progress dont click this ...</p>
                  <p>uhhhh work in progress dont click this ...</p>
                  <p>uhhhh work in progress dont click this ...</p>
                </Box>
                <Box mx="8" my="4" w="full">
                  <SongSearch
                    query={query}
                    setQuery={handleChange}
                    onKeyDown={searchSongs}
                  />
                  <SongList list={results} />
                </Box>
              </Flex>
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
      <RightSide playlistName={playlistName} />
    </Bar>
  );
}
