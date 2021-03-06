import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'slices/roomsSlice';
import { Icon, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import debounce from 'utils/debounce';

function RoomSearch() {
  const dispatch = useDispatch();
  const rooms = useSelector(state => state.rooms);
  const { filters } = rooms;

  const getRooms = query => {
    dispatch(get(query));
  };

  const handleChange = e => {
    const variables = {
      skip: 0,
      limit: 20,
      searchQuery: e.target.value,
      filters: filters,
    };
    debounceGetRooms(variables);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceGetRooms = useCallback(debounce(getRooms, 400), []);

  return (
    <InputGroup my={4}>
      <InputLeftElement
        pointerEvents="none"
        children={<Icon as={FaSearch} color="gray.600" />}
      />
      <Input
        onChange={handleChange}
        placeholder="Search for rooms..."
        size="md"
        _placeholder={{ color: 'white' }}
        _hover={{ backgroundColor: 'rgba(12, 15, 49, 0.6)' }}
      />
    </InputGroup>
  );
}

export default RoomSearch;
