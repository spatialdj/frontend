import React from 'react';
import { useSelector } from 'react-redux';
import {
  Flex,
  Text,
  Button,
  Container,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import RoomList from 'components/RoomList';
import RoomFilter from 'components/RoomFilter';
import RoomSearch from 'components/RoomSearch';
import CreateRoomModal from 'components/CreateRoomModal';

function Room(props) {
  // Handles create room modal opening and closing
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const user = useSelector(state => state.user);

  const handleOpenCreateRoom = () => {
    if (user?.authenticated) {
      onOpen();
    } else {
      toast({
        title: 'Please login first',
        status: 'info',
        duration: 5000,
        position: 'top',
        isClosable: true,
      });
      props.history.push('/login');
    }
  };

  return (
    <>
      <Container maxW="container.xl" p={8} overflow="auto">
        <Flex spacing={8} justifyContent="space-between">
          <Text fontSize="3xl" fontWeight="semibold" whiteSpace="nowrap">
            Rooms
          </Text>
          <Button onClick={handleOpenCreateRoom} colorScheme="blue">
            Create Room
          </Button>
        </Flex>
        <RoomSearch />
        <RoomFilter />
        <RoomList />
      </Container>
      <CreateRoomModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Room;