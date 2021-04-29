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
import RoomsFilter from 'components/RoomsFilter';
import { FaSearch } from 'react-icons/fa';

const rooms = [
  {
    id: 'asdasd123',
    name: 'EDM Mix',
    description: 'Come join and listen to some EDM Favorites!',
    genres: ['EDM', 'Rock', 'Jazz'],
    host: {
      username: 'attybach',
      profilePicture:
        'https://i.pinimg.com/originals/47/6f/fc/476ffc83637891f004e1ba6e1ca63e6c.jpg',
    },
    currentSong: { name: 'Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaartist - Song Name' },
  },
  {
    id: '2345sdgsdfg',
    name: 'Long very big room name lol bruh very big room name lol bruh ',
    description:
      'Super long description of lots of words and words and long description of lots of words and words and long description of lots of words and words and long description of lots of words and words and long description of lots of words and words and',
    genres: ['EDM'],
    host: {
      username: 'attybach',
      profilePicture:
        'https://i.pinimg.com/originals/47/6f/fc/476ffc83637891f004e1ba6e1ca63e6c.jpg',
    },
    currentSong: { name: 'Artist - Song Name' },
  },
  {
    id: 'vbndrgdgf',
    name: 'EDM Mix',
    description: 'Come join and listen to some EDM Favorites!',
    genres: ['Pop'],
    host: {
      username: 'attybach',
      profilePicture:
        'https://i.pinimg.com/originals/47/6f/fc/476ffc83637891f004e1ba6e1ca63e6c.jpg',
    },
    currentSong: { name: 'Artist - Song Name' },
  },
  {
    id: '4sdfdsv345',
    name: 'EDM Mix',
    description: 'Come join and listen to some EDM Favorites!',
    genres: ['Hip hop'],
    host: {
      username: 'attybach',
      profilePicture:
        'https://i.pinimg.com/originals/47/6f/fc/476ffc83637891f004e1ba6e1ca63e6c.jpg',
    },
    currentSong: { name: 'Artist - Song Name' },
  },
  {
    id: 'sdasd3453456',
    name: 'EDM Mix',
    description: 'Come join and listen to some EDM Favorites!',
    genres: ['Country'],
    host: {
      username: 'attybach',
      profilePicture:
        'https://i.pinimg.com/originals/47/6f/fc/476ffc83637891f004e1ba6e1ca63e6c.jpg',
    },
    currentSong: { name: 'Artist - Song Name' },
  },
  {
    id: 'dfbfd456',
    name: 'EDM Mix',
    description: 'Come join and listen to some EDM Favorites!',
    genres: ['R&B'],
    host: {
      username: 'attybach',
      profilePicture:
        'https://i.pinimg.com/originals/47/6f/fc/476ffc83637891f004e1ba6e1ca63e6c.jpg',
    },
    currentSong: { name: 'Artist - Song Name' },
  },
  {
    id: 'ghjghj567567sdf',
    name: 'EDM Mix',
    description: 'Come join and listen to some EDM Favorites!',
    genres: ['Indie', 'Jazz', 'Pop'],
    host: {
      username: 'attybach',
      profilePicture:
        'https://i.pinimg.com/originals/47/6f/fc/476ffc83637891f004e1ba6e1ca63e6c.jpg',
    },
    currentSong: { name: 'Artist - Song Name' },
  },
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
      <RoomsFilter />
      <SimpleGrid minChildWidth="364px" spacing={10}>
        {rooms.map(room => (
          <RoomCard key={room.id} room={room} />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default Room;
