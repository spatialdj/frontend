import React from 'react';
import { Icon, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

function SongSearch({ query, setQuery, onKeyDown }) {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<Icon as={FaSearch} color="gray.600" />}
      />
      <Input
        value={query}
        onChange={setQuery}
        onKeyDown={onKeyDown}
        placeholder="Search for songs on Youtube..."
      />
    </InputGroup>
  );
}

export default SongSearch;
