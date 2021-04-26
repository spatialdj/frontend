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
import styled from '@emotion/styled';

const Card = styled.div`
  background-color: #0C162D;
  opacity: 0.5;
  border-radius: 0.25rem;
  padding: 24px;

`;


const rooms = [
  {
    name: 'EDM Mix',
    description: 'Come here to have fun',
    genres: ['EDM', 'Pop', 'EDM', 'Pop'],
    host: { username: 'attybach', profilePicture: '' },
    currentSong: { name: 'title' },
  },
];
function index() {
  return (
    <Box bg="black" color="white" padding="8">
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
      <Grid
        h="200px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
        mt={8}
      >
        {rooms.map(room => {
          return (
            <GridItem key={room.name}>
              <Card>
                <Text color="white" opacity="1" fontSize="2xl">
                  {room.name}
                </Text>
                <Text color="white" fontSize="xl">
                  {room.song}
                </Text>
                <Text color="white" fontSize="md">
                  {room.description}
                </Text>
                <Flex>
                  <Text color="white">{room.host.username}</Text>
                  {room.genres.map(genre => {
                    return (
                      <Text color="white" key={genre} fontSize="md">
                        {genre}
                      </Text>
                    );
                  })}
                </Flex>
              </Card>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
}

export default index;
