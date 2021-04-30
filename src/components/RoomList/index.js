import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'slices/roomsSlice';
import { SimpleGrid } from '@chakra-ui/react';
import RoomCard from 'components/RoomCard';

function RoomList() {
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
    <>
      {data?.length === 0 ? (
        <>No rooms found</>
      ) : (
        <SimpleGrid minChildWidth="364px" spacing={10}>
          {data?.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
}

export default RoomList;
