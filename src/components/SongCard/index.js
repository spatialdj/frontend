import React from 'react';
import { Center, Flex, Text, Image, Button, Icon, Box } from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import he from 'he';

function Song({ data, isInSearch }) {
  const { title, thumbnails, channelTitle } = data;

  const handleOnClick = () => {
    if (isInSearch) {
      // TODO: add song to user playlist
    } else {
      // TODO: delete song from user playlist
    }
  };

  return (
    <Flex
      bg="#211E1E"
      my="2"
      px="8"
      py="4"
      justify="space-between"
      borderRadius="8px"
    >
      <Flex>
        {!isInSearch && (
          <Center>
            <Icon as={GiHamburgerMenu} pr="1rem" boxSize={8} />
          </Center>
        )}
        <Image src={thumbnails.default.url} alt="thumbnail" />
        <Box>
          <Text m="4">{he.decode(title)}</Text>
          <Text m="4">{he.decode(channelTitle)}</Text>
        </Box>
      </Flex>
      <Button
        style={{ marginTop: 'auto', marginBottom: 'auto' }}
        bg="none"
        _hover={{ opacity: 0.5 }}
      >
        {
          <Icon
            onClick={handleOnClick}
            as={isInSearch ? FaPlus : FaTrashAlt}
            color={isInSearch ? 'gray.300' : 'red.300'}
          />
        }
      </Button>
    </Flex>
  );
}

export default Song;
