import React from 'react';
import {
  Flex,
  Text,
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Container,
  SimpleGrid,
  HStack,
} from '@chakra-ui/react';
import RoomCard from 'components/RoomCard';
import { FaSearch } from 'react-icons/fa';

const rooms = [
  {
    name: 'EDM Mix',
    description: 'Come join and listen to some EDM Favorites!',
    genres: ['EDM', 'Pop', 'EDM', 'Pop'],
    host: {
      username: 'attybach',
      profilePicture:
        'https://i.pinimg.com/originals/47/6f/fc/476ffc83637891f004e1ba6e1ca63e6c.jpg',
    },
    currentSong: { name: 'Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaartist - Song Name' },
  },
  {
    name: 'Long very big room name lol bruh very big room name lol bruh ',
    description:
      'Super long description of lots of words and words and long description of lots of words and words and long description of lots of words and words and long description of lots of words and words and long description of lots of words and words and',
    genres: ['EDM', 'Pop', 'EDM', 'Pop'],
    host: {
      username: 'attybach',
      profilePicture:
        'https://i.pinimg.com/originals/47/6f/fc/476ffc83637891f004e1ba6e1ca63e6c.jpg',
    },
    currentSong: { name: 'Artist - Song Name' },
  },
  {
    name: 'EDM Mix',
    description: 'Come join and listen to some EDM Favorites!',
    genres: ['EDM', 'Pop', 'EDM', 'Pop'],
    host: {
      username: 'attybach',
      profilePicture:
        'https://i.pinimg.com/originals/47/6f/fc/476ffc83637891f004e1ba6e1ca63e6c.jpg',
    },
    currentSong: { name: 'Artist - Song Name' },
  },
  {
    name: 'EDM Mix',
    description: 'Come join and listen to some EDM Favorites!',
    genres: ['EDM', 'Pop', 'EDM', 'Pop'],
    host: {
      username: 'attybach',
      profilePicture:
        'https://i.pinimg.com/originals/47/6f/fc/476ffc83637891f004e1ba6e1ca63e6c.jpg',
    },
    currentSong: { name: 'Artist - Song Name' },
  },
  {
    name: 'EDM Mix',
    description: 'Come join and listen to some EDM Favorites!',
    genres: ['EDM', 'Pop', 'EDM', 'Pop'],
    host: {
      username: 'attybach',
      profilePicture:
        'https://i.pinimg.com/originals/47/6f/fc/476ffc83637891f004e1ba6e1ca63e6c.jpg',
    },
    currentSong: { name: 'Artist - Song Name' },
  },
  {
    name: 'EDM Mix',
    description: 'Come join and listen to some EDM Favorites!',
    genres: ['EDM', 'Pop', 'EDM', 'Pop'],
    host: {
      username: 'attybach',
      profilePicture:
        'https://i.pinimg.com/originals/47/6f/fc/476ffc83637891f004e1ba6e1ca63e6c.jpg',
    },
    currentSong: { name: 'Artist - Song Name' },
  },
  {
    name: 'EDM Mix',
    description: 'Come join and listen to some EDM Favorites!',
    genres: ['EDM', 'Pop', 'EDM', 'Pop'],
    host: {
      username: 'attybach',
      profilePicture:
        'https://i.pinimg.com/originals/47/6f/fc/476ffc83637891f004e1ba6e1ca63e6c.jpg',
    },
    currentSong: { name: 'Artist - Song Name' },
  },
];

const genres = [
  'EDM',
  'Pop',
  'Hip hop',
  'R&B',
  'Rock',
  'Country',
  'Indie',
  'Jazz',
];

function Room() {
  return (
    <Container maxW="container.xl" p={8} overflow="auto">
      <HStack spacing={8} display={['none', null, 'flex']}>
        <Text fontSize="3xl" fontWeight="semibold" whiteSpace="nowrap">
          Rooms
        </Text>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={FaSearch} color="gray.600" />}
          />
          <Input placeholder="Search for rooms..." size="md" />
        </InputGroup>
        <Button px={8} colorScheme="blue">
          Create Room
        </Button>
      </HStack>
      <Flex
        spacing={8}
        justifyContent="space-between"
        display={['flex', null, 'none']}
      >
        <Text fontSize="3xl" fontWeight="semibold" whiteSpace="nowrap">
          Rooms
        </Text>
        <Button colorScheme="blue">Create Room</Button>
      </Flex>
      <InputGroup my={4} display={['flex', null, 'none']}>
        <InputLeftElement
          pointerEvents="none"
          children={<Icon as={FaSearch} color="gray.600" />}
        />
        <Input placeholder="Search for rooms..." size="md" />
      </InputGroup>
      <HStack my={4} spacing={4}>
        <Text>Filter</Text>
        <HStack wrap="wrap">
          {genres.map(genre => {
            return (
              <Button key={genre} variant="solid" size="sm">
                {genre}
              </Button>
            );
          })}
        </HStack>
      </HStack>
      <SimpleGrid minChildWidth="364px" spacing={10}>
        {rooms.map(room => (
          <RoomCard key={room.name} room={room} />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default Room;
