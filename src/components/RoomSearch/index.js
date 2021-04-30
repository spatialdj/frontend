import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'slices/roomsSlice';
import { Icon, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import debounce from 'utils/debounce';

function RoomSearch() {
  const dispatch = useDispatch();
  // const rooms = useSelector(state => state.rooms);
  // const {data, searchQuery, limit, skip, filters, status} = rooms;
  // const [search, setSearch] = useState('');

  const getRooms = query => {
    dispatch(get(query));
  };

  const handleChange = e => {
    const variables = {
      skip: 0,
      limit: 20,
      searchQuery: e.target.value,
    };
    debounceGetRooms(variables);
  };

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
      />
    </InputGroup>
  );
}

export default RoomSearch;
