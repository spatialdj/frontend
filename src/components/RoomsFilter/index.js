import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Text,
  Button,
  HStack,
} from '@chakra-ui/react';

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

function RoomsFilter(props) {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const dispatch = useDispatch();

  const selectFilter = key => {
    const isSelected = selectedFilters.includes(key);
    if (isSelected) {
      setSelectedFilters(filters => filters.filter(f => f !== key));
    } else {
      setSelectedFilters(filters => [...filters, key]);
    }
  };

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

export default RoomsFilter;
