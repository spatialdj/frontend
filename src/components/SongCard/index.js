import React from 'react';
import { Flex, Text, Image, Button, Icon, Box } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import he from 'he';

function Song({ data }) {
  const { title, thumbnails, channelTitle } = data;
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
        <Box>
          <Text m="4">{he.decode(title)}</Text>
          <Text m="4">{he.decode(channelTitle)}</Text>
        </Box>
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
