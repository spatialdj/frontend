import React, { useState, useRef } from 'react';
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
import { clearSearch } from 'slices/songSearchSlice';

export default function SongDrawer(props) {
  const [pendingNew, setPendingNew] = useState(false);
  const [pendingRename, setPendingRename] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const renameInputValue = useRef('UNDEFINED');
  const dispatch = useDispatch();

  const playlists = useSelector(state => {
    return Object.entries(state.playlists.playlists).map(
      ([_id, playlist]) => playlist
    );
  });
  const selectedPlaylistId = useSelector(
    state => state.playlists.selectedPlaylist
  );
  const songSearchStatus = useSelector(state => state.songSearch.status);

  const handlePlaylistChange = async playlistId => {
    // dont update if it's same as already selected playlist
    if (playlistId === selectedPlaylistId && songSearchStatus === 'idle') {
      return;
    }

    // update redux before server for better ux
    dispatch(selectPlaylist({ playlistId }));
    // Clear search results and query
    dispatch(clearSearch());

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
                className="dark-scrollbar"
                mt={1}
                maxH="475px"
                spacing={1}
                overflowY="auto"
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
              <SongSearch />
              <SongList />
            </Box>
          </SimpleGrid>
        </DrawerBody>
      </DrawerContent>
    </>
  );
}
