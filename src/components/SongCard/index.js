import React from 'react';
import {
  Center,
  Flex,
  Text,
  Image,
  Button,
  Icon,
  IconButton,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import he from 'he';
import { useDispatch, useSelector } from 'react-redux';
import * as playlistAPI from '../../services/playlist.js';
import { addSong, removeSong } from '../../slices/playlistsSlice';

function Song({ selectedPlaylist, data, isInSearch }) {
  const { title, thumbnails, channelTitle } = data;
  const playlists = useSelector(state => {
    return Object.entries(state.playlists.playlists).map(
      ([_id, playlist]) => playlist
    );
  });
  const dispatch = useDispatch();

  const handleOnClickDelete = async () => {
    if (!selectedPlaylist) {
      return;
    }

    // remove from redux state first for better ux
    dispatch(removeSong({ songId: data.id, playlistId: selectedPlaylist }));

    const res = await playlistAPI.removeSong(selectedPlaylist, { id: data.id });
    console.log(data.id);

    if (res.status !== 200) {
      // todo: unable to remove song from playlist
    }
  };

  const handleOnClickAdd = async playlist => {
    const res = await playlistAPI.addSong(playlist.id, { song: data });

    if (res.status === 200) {
      dispatch(addSong({ song: res.data.song, playlistId: playlist.id }));
    } else {
      // todo: unable to add song
    }
  };

  return (
    <Flex bg="#211E1E" px="8" py="4" justify="space-between" borderRadius="8px">
      <Flex>
        {!isInSearch && (
          <Center>
            <Icon as={GiHamburgerMenu} pr="1rem" boxSize={8} />
          </Center>
        )}
        <Image src={thumbnails.default.url} alt="thumbnail" />
        <Box>
          <Text m="4">{he.decode(title)}</Text>
          <Text m="4">{he.decode(channelTitle)}</Text>
        </Box>
      </Flex>

      {isInSearch ? (
        <Menu>
          <MenuButton
            style={{ marginTop: 'auto', marginBottom: 'auto' }}
            as={IconButton}
            aria-label="Options"
            icon={<FaPlus />}
            color="gray.300"
          />
          <MenuList>
            {playlists.length > 0 ? (
              playlists.map((playlist, index) => (
                <MenuItem
                  key={index}
                  onClick={async () => await handleOnClickAdd(playlist)}
                >
                  {playlist.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem isDisabled>No playlists...</MenuItem>
            )}
          </MenuList>
        </Menu>
      ) : (
        <Button
          style={{ marginTop: 'auto', marginBottom: 'auto' }}
          bg="none"
          _hover={{ opacity: 0.5 }}
          onClick={async () => await handleOnClickDelete()}
        >
          <Icon as={FaTrashAlt} color={'red.300'} />
        </Button>
      )}
    </Flex>
  );
}

export default Song;
