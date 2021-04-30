import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'slices/roomsSlice';
import { Flex, Text, Button, Container, SimpleGrid } from '@chakra-ui/react';
import RoomCard from 'components/RoomCard';
import RoomsFilter from 'components/RoomsFilter';
import RoomsSearch from 'components/RoomsSearch';

function Room() {
  const dispatch = useDispatch();
  const rooms = useSelector(state => state.rooms);
  const { data, searchQuery, limit, skip, filters, status } = rooms;

  useEffect(() => {
    // Initial get 20 rooms
    dispatch(
      get({
        searchQuery: '*',
        limit: 20,
        skip: 0,
        filters: [],
      })
    );
  }, [dispatch]);

  return (
    <Container maxW="container.xl" p={8} overflow="auto">
      <Flex spacing={8} justifyContent="space-between">
        <Text fontSize="3xl" fontWeight="semibold" whiteSpace="nowrap">
          Rooms
        </Text>
        <Button colorScheme="blue">Create Room</Button>
      </Flex>
      <RoomsSearch />
      <RoomsFilter />
      {data?.length === 0 ? (
        <>No rooms found</>
      ) : (
        <SimpleGrid minChildWidth="364px" spacing={10}>
          {data?.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}

export default Room;
