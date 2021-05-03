import React from 'react';
import { Icon, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

function SongSearch({ query, setQuery, onKeyDown }) {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<Icon as={FaSearch} color="#8F8F8F" />}
      />
      <Input
        value={query}
        onChange={setQuery}
        onKeyDown={onKeyDown}
        placeholder="Search for songs on Youtube..."
        _placeholder={{ color: 'white' }}
      />
    </InputGroup>
  );
}

export default SongSearch;
