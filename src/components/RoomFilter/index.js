import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'slices/roomsSlice';
import { Text, Button, HStack } from '@chakra-ui/react';

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

function RoomFilter() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const dispatch = useDispatch();
  const firstLoad = useRef(true);
  const rooms = useSelector(state => state.rooms);
  const { searchQuery } = rooms;

  const selectFilter = key => {
    const isSelected = selectedFilters.includes(key);
    if (isSelected) {
      setSelectedFilters(filters => filters.filter(f => f !== key));
    } else {
      setSelectedFilters(filters => [...filters, key]);
    }
  };

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
    } else {
      dispatch(
        get({
          searchQuery: searchQuery,
          limit: 20,
          skip: 0,
          filters: selectedFilters,
        })
      );
    }
  }, [selectedFilters]);

  return (
    <HStack my={4} spacing={4}>
      <Text>Filter</Text>
      <HStack wrap="wrap">
        {genres.map(genre => {
          const isSelected = selectedFilters.includes(genre);
          return (
            <Button
              key={genre}
              onClick={() => selectFilter(genre)}
              colorScheme={isSelected ? 'blue' : 'gray'}
              variant="solid"
              size="sm"
            >
              {genre}
            </Button>
          );
        })}
      </HStack>
    </HStack>
  );
}

export default RoomFilter;
