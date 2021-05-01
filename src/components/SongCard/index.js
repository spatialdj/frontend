import React from 'react';
import { Flex, Text, Image, Button, Icon } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

function Song({ data }) {
  const { title, thumbnails } = data;
  return (
    <Flex
      bg="black"
      my="2"
      px="8"
      py="4"
      justify="space-between"
      borderRadius="8px"
    >
      <Flex>
        <Image src={thumbnails.default.url} alt="thumbnail" />
        <Text m="4">{title}</Text>
      </Flex>
      <Button
        style={{ 'margin-top': 'auto', 'margin-bottom': 'auto' }}
        bg="none"
        _hover={{ opacity: 0.5 }}
      >
        {<Icon as={FaPlus} color="gray.300" />}
      </Button>
    </Flex>
  );
}

export default Song;
