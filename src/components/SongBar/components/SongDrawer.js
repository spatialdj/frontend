import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  DrawerBody,
  SimpleGrid,
  Flex,
  Heading,
  Text,
  HStack,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import SongSearch from '../../SongSearch';
import SongList from '../../SongList';
import { search } from '../../../services/song.js';
import { FaChevronDown } from 'react-icons/fa';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import * as playlistAPI from '../../../services/playlist.js';
import {
  updatePlaylist,
  createPlaylist,
  selectPlaylist,
  populate,
} from '../../../slices/playlistsSlice';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function SongDrawer(props) {
  const [query, setQuery] = useState('');
  const [queryInProgress, setQueryInProgress] = useState(false);
  const [results, setResults] = useState([]);
  const [pendingNew, setPendingNew] = useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const searchSongs = async e => {
    if (e.key === 'Enter') {
      const res = await search(query);
      setResults(res.data.data.videos);
      setQueryInProgress(true);
    }
  };

  const playlists = useSelector(state => {
    return Object.entries(state.playlists.playlists).map(
      ([_id, playlist]) => playlist
    );
  });
  const selectedPlaylistId = useSelector(
    state => state.playlists.selectedPlaylist
  );
  const selectedPlaylist = useSelector(
    state => state.playlists.playlists[state.playlists.selectedPlaylist]
  );
  const selectedPlaylistData = selectedPlaylist?.queue ?? [];

  const handlePlaylistChange = async playlistId => {
    // clear search results
    setQuery('');
    setQueryInProgress(false);

    // dont update if it's same as already selected playlist
    if (playlistId === selectedPlaylistId) {
      return;
    }

    // update redux before server for better ux
    dispatch(selectPlaylist({ playlistId }));

    // update server state
    const res = await playlistAPI.select(playlistId);

    if (res.status !== 200) {
      // todo: failed to select playlist
    }

    const newPlaylists = [];

    for (let i = 0; i < playlists.length; i++) {
      let selected;

      if (playlists[i].id === playlistId) {
        selected = true;
      } else {
        selected = false;
      }
      newPlaylists.push({ ...playlists[i], selected });
    }
    // setPlaylists(newPlaylists);
    // getPlaylistSongs();
    setQueryInProgress(false);
  };

  const handleOnDragEnd = async result => {
    if (!result.destination || !selectedPlaylist) {
      return;
    }

    const reorderedSongs = reorder(
      selectedPlaylistData,
      result.source.index,
      result.destination.index
    );
    const newPlaylist = {
      id: selectedPlaylist.id,
      name: selectedPlaylist.name,
      user: selectedPlaylist.user,
      queue: reorderedSongs,
    };

    dispatch(updatePlaylist({ playlist: newPlaylist }));

    const res = await playlistAPI.update(newPlaylist.id, newPlaylist);

    if (res !== 200) {
      // todo: failed to rearrange playlist
    }
  };

  const onClickNewButton = async () => {
    setPendingNew(true);

    const res = await playlistAPI.create({
      name: 'New playlist',
    });

    if (res.status === 200 && res.data?.success) {
      const newPlaylist = res.data.playlist;

      dispatch(createPlaylist({ playlist: newPlaylist }));
    } else {
      // todo: error occurred unable to create playlist
    }

    setPendingNew(false);
  };

  return (
    <DrawerOverlay>
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px" bgColor="black">
          <IconButton
            variant="outline"
            onClick={props.handleOnClose}
            icon={<FaChevronDown />}
            mr="2rem"
          />
          Playlist Manager
        </DrawerHeader>
        <DrawerBody bgColor="black">
          <SimpleGrid my={2} columns={2} templateColumns="1fr 3fr" spacing={8}>
            <Box minW="260px">
              <HStack
                h="var(--chakra-sizes-10)"
                mb={4}
                spacing={0}
                justifyContent="space-between"
              >
                <Heading fontSize="lg">Your Playlists</Heading>
                <Button
                  isLoading={pendingNew}
                  loadingText=""
                  colorScheme="blue"
                  size="sm"
                  onClick={onClickNewButton}
                >
                  New
                </Button>
              </HStack>
              <VStack
                mt={1}
                maxH="475px"
                spacing={1}
                overflowY="auto"
                style={{
                  scrollbarColor: '#404040 #000000',
                }}
              >
                {playlists.map(playlist => (
                  <HStack
                    spacing={0}
                    justifyContent="space-between"
                    alignItems="center"
                    cursor="pointer"
                    borderRadius="0.375rem"
                    bgColor={
                      playlist.id === selectedPlaylistId ? '#404040' : 'black'
                    }
                    key={playlist.id}
                    w="100%"
                    py={1}
                    pl={4}
                    onClick={async () =>
                      await handlePlaylistChange(playlist.id)
                    }
                  >
                    <Text>{playlist.name}</Text>
                    <span>
                      <IconButton
                        aria-label="Rename playlist"
                        icon={<MdEdit />}
                        variant="ghost"
                      />
                      <IconButton
                        aria-label="Delete playlist"
                        icon={<MdDelete />}
                        variant="ghost"
                        colorScheme="red"
                      />
                    </span>
                  </HStack>
                ))}
              </VStack>
            </Box>
            <Box w="full">
              <SongSearch
                query={query}
                setQuery={e => setQuery(e.target.value)}
                onKeyDown={searchSongs}
              />
              <SongList
                selectedPlaylist={selectedPlaylistId}
                list={queryInProgress ? results : selectedPlaylistData}
                isInSearch={queryInProgress}
                handleOnDragEnd={handleOnDragEnd}
              />
            </Box>
          </SimpleGrid>
        </DrawerBody>
      </DrawerContent>
    </DrawerOverlay>
  );
}
