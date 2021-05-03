import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Divider,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  DrawerBody,
  Flex,
  Heading,
  HStack,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import SongSearch from '../../SongSearch';
import SongList from '../../SongList';
import { search } from '../../../services/song.js';
import { FaChevronDown } from 'react-icons/fa';

export default function SongDrawer(props) {
  const [query, setQuery] = useState('');
  const [queryInProgress, setQueryInProgress] = useState(false);
  const [results, setResults] = useState([]);

  const searchSongs = async e => {
    if (e.key === 'Enter') {
      const res = await search(query);
      setResults(res.data.data.videos);
      setQueryInProgress(true);
    }
  };

  // TEST DATA
  const initialPlaylists = [
    {
      id: 1,
      name: 'Epic Bangers',
      selected: true,
    },
    {
      id: 2,
      name: 'Trap beats',
      selected: false,
    },
    {
      id: 3,
      name: 'this is a really really long playlist name',
      selected: false,
    },
    {
      id: 4,
      name: 'Epic Bangers',
      selected: false,
    },
    {
      id: 5,
      name: 'Trap beats',
      selected: false,
    },
    {
      id: 6,
      name: 'this is a really really long playlist name',
      selected: false,
    },
    {
      id: 7,
      name: 'Epic Bangers',
      selected: false,
    },
    {
      id: 8,
      name: 'Trap beats',
      selected: false,
    },
    {
      id: 9,
      name: 'this is a really really long playlist name',
      selected: false,
    },
    {
      id: 10,
      name: 'this is a really really long playlist name',
      selected: false,
    },
  ];
  const testPlaylistData1 = [
    {
      id: 'y6120QOlsfU',
      title: 'Darude - Sandstorm',
      thumbnails: {
        default: {
          url: 'https://i.ytimg.com/vi/y6120QOlsfU/default.jpg',
        },
      },
      channelTitle: 'Darude',
    },
    {
      id: 'gFsdPrBLHO0',
      title: 'Sandstorm',
      thumbnails: {
        default: {
          url: 'https://i.ytimg.com/vi/gFsdPrBLHO0/default.jpg',
        },
      },
      channelTitle: 'Darude - Topic',
    },
    {
      id: '61-PXrbs4MA',
      title: 'Darude - Sandstorm (Original Mix)',
      thumbnails: {
        default: {
          url: 'https://i.ytimg.com/vi/61-PXrbs4MA/default.jpg',
        },
      },
      channelTitle: 'Rori Gustavo',
    },
  ];
  const testPlaylistData2 = [
    {
      id: 'oTuYKF_BT9A',
      title: 'TWICE「Kura Kura」Special Dance Clip',
      thumbnails: {
        default: {
          url: 'https://i.ytimg.com/vi/oTuYKF_BT9A/default.jpg',
        },
      },
      channelTitle: 'TWICE JAPAN OFFICIAL YouTube Channel',
    },
    {
      id: 'BSS8Y-0hOlY',
      title: 'TWICE 「Kura Kura」 Music Video',
      thumbnails: {
        default: {
          url: 'https://i.ytimg.com/vi/BSS8Y-0hOlY/default.jpg',
        },
      },
      channelTitle: 'TWICE JAPAN OFFICIAL YouTube Channel',
    },
    {
      id: 'CM4CkVFmTds',
      title: 'TWICE &quot;I CAN&#39;T STOP ME&quot; M/V',
      thumbnails: {
        default: {
          url: 'https://i.ytimg.com/vi/CM4CkVFmTds/default.jpg',
        },
      },
      channelTitle: 'JYP Entertainment',
    },
    {
      id: 'kOHB85vDuow',
      title: 'TWICE &quot;FANCY&quot; M/V',
      thumbnails: {
        default: {
          url: 'https://i.ytimg.com/vi/kOHB85vDuow/default.jpg',
        },
      },
      channelTitle: 'JYP Entertainment',
    },
    {
      id: '4dYEgvnowzc',
      title:
        'TWICE REALITY “TIME TO TWICE” TDOONG Entertainment Season 2 EP.01',
      thumbnails: {
        default: {
          url: 'https://i.ytimg.com/vi/4dYEgvnowzc/default.jpg',
        },
      },
      channelTitle: 'TWICE',
    },
    {
      id: 'bkQw-F1QTq4',
      title: 'TWICE &#39;CRY FOR ME&#39; Choreography - 2',
      thumbnails: {
        default: {
          url: 'https://i.ytimg.com/vi/bkQw-F1QTq4/default.jpg',
        },
      },
      channelTitle: 'TWICE',
    },
  ];

  // TODO: use redux to get list of playlistIds and selected playlist
  const [playlists, setPlaylists] = useState(initialPlaylists);
  let currentPlaylistId =
    initialPlaylists.length > 0 ? initialPlaylists[0].id : null;

  // TODO: call API to get playlist songs
  const [currentPlaylistData, setCurrentPlaylistData] = useState(
    currentPlaylistId ? testPlaylistData1 : null
  );

  const handlePlaylistChange = playlistId => {
    const newPlaylists = [];
    for (let i = 0; i < playlists.length; i++) {
      let selected;
      if (playlists[i].id === playlistId) {
        selected = true;
        currentPlaylistId = playlistId;
      } else {
        selected = false;
      }
      newPlaylists.push({ ...playlists[i], selected });
    }
    setPlaylists(newPlaylists);
    getPlaylistSongs();
    setQueryInProgress(false);
  };

  // TODO: call API to get playlist songs
  const getPlaylistSongs = () => {
    if (currentPlaylistId === 1) {
      setCurrentPlaylistData(testPlaylistData1);
    } else {
      setCurrentPlaylistData(testPlaylistData2);
    }
  };

  const handleOnDragEnd = result => {
    if (result.destination) {
      const items = Array.from(currentPlaylistData);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setCurrentPlaylistData(items);
    }
  };

  return (
    <DrawerOverlay>
      <DrawerContent maxH="75%">
        <DrawerHeader borderBottomWidth="1px" bgColor="black">
          <IconButton
            variant="outline"
            onClick={props.handleOnClose}
            icon={<FaChevronDown />}
            mr="2rem"
          />
          Playlist Manager
        </DrawerHeader>
        <DrawerBody bgColor="black" pl="0">
          <Flex>
            <Box my="4" minW="260px">
              <HStack
                px="1rem"
                pb="1rem"
                spacing="5"
                justifyContent="space-between"
              >
                <Heading fontSize="lg">Your Playlists 🔥</Heading>
                <Button colorScheme="blue" size="sm">
                  New
                </Button>
              </HStack>
              <VStack
                maxH="475px"
                spacing="0"
                overflowY="scroll"
                style={{
                  scrollbarColor: '#404040 #000000',
                }}
              >
                {playlists.map(playlist => (
                  <Box
                    style={{
                      cursor: 'pointer',
                    }}
                    bgColor={playlist.selected ? '#404040' : 'black'}
                    key={playlist.id}
                    w="100%"
                    py="0.75rem"
                    pl="1rem"
                    onClick={() => handlePlaylistChange(playlist.id)}
                  >
                    {playlist.name}
                  </Box>
                ))}
              </VStack>
            </Box>
            <Box mx="8" my="4" w="full">
              <SongSearch
                query={query}
                setQuery={e => setQuery(e.target.value)}
                onKeyDown={searchSongs}
              />
              <SongList
                list={queryInProgress ? results : currentPlaylistData}
                isInSearch={queryInProgress}
                handleOnDragEnd={handleOnDragEnd}
              />
            </Box>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </DrawerOverlay>
  );
}
