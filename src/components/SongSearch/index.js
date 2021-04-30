import React from 'react';
import { Icon, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

function SongSearch({ query, setQuery }) {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<Icon as={FaSearch} color="gray.600" />}
      />
      <Input
        value={query}
        onChange={setQuery}
        placeholder="Search for rooms..."
        size="md"
      />
    </InputGroup>
  );
}

export default SongSearch;
