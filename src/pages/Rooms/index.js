import React from 'react';
import {
  Flex,
  Text,
  Input,
  Button,
  Grid,
  GridItem,
  Box,
} from '@chakra-ui/react';
const rooms = [
  {
    name: 'EDM Mix',
    description: 'Come here to have fun',
    genres: ['EDM', 'Pop', 'EDM', 'Pop'],
    host: { username: 'attybach', profilePicture: '' },
    currentSong: { name: "title" }
  },
];
function index() {
  return (
    <Box bg="black" color="white" padding="8">
      <Flex direction="row">
        <Text fontSize="3xl">All Rooms</Text>
        <Input placeholder="Search for room.." />
        <Button colorScheme="blue">Create Room</Button>
      </Flex>
      <Grid
        h="200px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        {rooms.map(room => {
          return (
            <GridItem key={room.name}>
              <Box bg="gray.700" opacity="0.5" padding="4">
                <Text color="white" fontSize="2xl">
                  {room.name}
                </Text>
                <Text  fontSize="xl">
                  {room.song}
                </Text>
                <Text fontSize="md">
                  {room.description}
                </Text>
                <Flex>
                  <Text>{room.host.username}</Text>
                  {room.genres.map(genre => {
                    return (
                      <Text key={genre} fontSize="md">
                        {genre}
                      </Text>
                    );
                  })}
                </Flex>
              </Box>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
}

export default index;
