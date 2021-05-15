import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { search } from 'slices/songSearchSlice';

function SongSearch() {
  const dispatch = useDispatch();
  const globalQuery = useSelector(state => state.songSearch.query);
  const [localQuery, setLocalQuery] = useState(globalQuery);

  useEffect(() => {
    if (globalQuery !== localQuery) {
      setLocalQuery(globalQuery);
    }
  }, [globalQuery]);

  const searchSongs = e => {
    if (e.key === 'Enter') {
      dispatch(search(e.target.value));
    }
  };

  return (
    <InputGroup mb={4}>
      <InputLeftElement
        pointerEvents="none"
        children={<Icon as={FaSearch} color="#8F8F8F" />}
      />
      <Input
        value={localQuery}
        onChange={e => setLocalQuery(e.target.value)}
        onKeyDown={searchSongs}
        placeholder="Search for songs on Youtube..."
        _placeholder={{ color: 'white' }}
      />
    </InputGroup>
  );
}

export default SongSearch;
