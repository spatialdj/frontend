import React from 'react';
import {
  Flex,
  Text,
  Input,
  Button,
  Grid,
  GridItem,
  Box,
  Container,
  Stack,
  Image,
} from '@chakra-ui/react';
import styled from '@emotion/styled';

const Card = styled.div`
  background-color: #0c162d;
  opacity: 1;
  border-radius: 0.25rem;
  padding: 16px;
`;

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
function index() {
  return (
    <Box bg="black" color="white" padding="8" h="full">
      <Flex direction="row" justify="space-between">
        <Text fontSize="2xl" mr="4">
          All Rooms
        </Text>

        <Button
          bg="purple.800"
          _hover={{
            background: 'purple.900',
            color: 'white',
          }}
        >
          Create Room
        </Button>
      </Flex>
      <Input placeholder="Search for rooms..." size="md" my="8" />
      <Flex>
        <Text my="4" mr="4">
          Filter
        </Text>
        {genres.map(genre => {
          return (
            <Button
              key={genre}
              margin="2"
              ml="0"
              bg="purple.800"
              _hover={{
                background: 'purple.900',
                color: 'white',
              }}
            >
              {genre}
            </Button>
          );
        })}
      </Flex>
      <Grid
        templateColumns="repeat(3, 1fr)"
        templateRows="repeat(2, 1fr)"
        gap={4}
        mt={6}
      >
        {rooms.map(room => {
          return (
            <GridItem key={room.name}>
              <Stack spacing="0">
                <Card>
                  <Container opacity="1" color="white" z-index="1">
                    <Text color="white" opacity="1" fontSize="2xl">
                      {room.name}
                    </Text>
                    <Text color="white" fontSize="xl">
                      {room.currentSong.name}
                    </Text>
                    <Text color="white" fontSize="md">
                      {room.description}
                    </Text>
                    <Flex>
                      <Image
                        w="12"
                        h="12"
                        borderRadius="full"
                        src={room.host.profilePicture}
                        alt="pfp"
                        my="4"
                      />
                      <Text color="white" mx="2" my="6">
                        {room.host.username}
                      </Text>
                      {room.genres.map(genre => {
                        return (
                          <Button
                            mx="2"
                            my="4"
                            color="white"
                            key={genre}
                            fontSize="md"
                          >
                            {genre}
                          </Button>
                        );
                      })}
                    </Flex>
                  </Container>
                </Card>
              </Stack>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
}

export default index;
//
