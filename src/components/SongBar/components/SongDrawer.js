import React, { useState, useRef, useEffect } from 'react';
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
  Input,
} from '@chakra-ui/react';
import SongSearch from '../../SongSearch';
import SongList from '../../SongList';
import { search } from '../../../services/song.js';
import { FaChevronDown } from 'react-icons/fa';
import { MdDelete, MdEdit, MdCheck } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import * as playlistAPI from '../../../services/playlist.js';
import {
  updatePlaylist,
  createPlaylist,
  selectPlaylist,
  deletePlaylist,
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
  const [pendingRename, setPendingRename] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const renameInputValue = useRef('UNDEFINED');
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

    if (res.status !== 200) {
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

  const onClickDeleteButton = async (e, id) => {
    e.stopPropagation();
    if (editingId === null) {
      setPendingDelete(id);

      const res = await playlistAPI.deletePlaylist(id);

      if (res.status === 200) {
        setPendingDelete(null);
        dispatch(deletePlaylist({ playlistId: id }));
      } else {
        // todo: error occurred unable to delete
      }
    } else {
      renameInputValue.current = 'UNDEFINED';
      setEditingId(null);
    }
  };

  const onClickEditButton = (e, id, name) => {
    e.stopPropagation();
    if (editingId === null) {
      renameInputValue.current = name;
      setEditingId(id);
    } else {
      renameInputValue.current = 'UNDEFINED';
      setEditingId(null);
      // onClickConfirmRenameButton(e, editingId);
    }
  };

  const onClickConfirmRenameButton = async (e, id) => {
    e.stopPropagation();
    setPendingRename(true);

    const foundPlaylist = playlists.find(playlist => playlist.id === id);

    if (foundPlaylist) {
      const newPlaylist = {
        id: id,
        name: renameInputValue.current,
        user: foundPlaylist.user,
        queue: foundPlaylist.queue,
      };

      dispatch(updatePlaylist({ playlist: newPlaylist }));

      const res = await playlistAPI.update(id, newPlaylist);
      setPendingRename(false);

      if (res.status === 200) {
        renameInputValue.current = 'UNDEFINED';
        setEditingId(null);
      } else {
        // todo: failed to update name
      }
    }
  };

  const handleRenameChange = e => {
    e.stopPropagation();
    renameInputValue.current = e.target.value;
  };

  return (
    <>
      <DrawerOverlay />
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
                    onClick={() => handlePlaylistChange(playlist.id)}
                  >
                    {editingId === playlist.id ? (
                      <Input
                        autoFocus
                        placeholder="Playlist name"
                        variant="flushed"
                        disabled={pendingRename}
                        defaultValue={playlist.name}
                        onChange={handleRenameChange}
                        onClick={e => e.stopPropagation()}
                      />
                    ) : (
                      <Text>{playlist.name}</Text>
                    )}
                    <Flex>
                      {editingId === playlist.id ? (
                        <IconButton
                          isLoading={pendingRename}
                          onClick={e =>
                            onClickConfirmRenameButton(e, playlist.id)
                          }
                          aria-label="Confirm rename playlist"
                          icon={<MdCheck />}
                          variant="ghost"
                        />
                      ) : (
                        <IconButton
                          onClick={e =>
                            onClickEditButton(e, playlist.id, playlist.name)
                          }
                          aria-label="Rename playlist"
                          icon={<MdEdit />}
                          variant="ghost"
                        />
                      )}

                      <IconButton
                        isLoading={pendingDelete === playlist.id}
                        onClick={e => onClickDeleteButton(e, playlist.id)}
                        aria-label="Delete playlist"
                        icon={<MdDelete />}
                        variant="ghost"
                        colorScheme="red"
                      />
                    </Flex>
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
    </>
  );
}
