import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get } from 'slices/roomsSlice';
import {
  Flex,
  Text,
  Button,
  Container,
  SimpleGrid,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import RoomCard from 'components/RoomCard';
import RoomsFilter from 'components/RoomsFilter';
import RoomsSearch from 'components/RoomsSearch';
import CreateRoomModal from 'components/CreateRoomModal';

function Room(props) {
  const dispatch = useDispatch();
  // Handles create room modal opening and closing
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const rooms = useSelector(state => state.rooms);
  const user = useSelector(state => state.user);
  const { data, searchQuery, limit, skip, filters, status } = rooms;

  useEffect(() => {
    // Initial get 20 rooms
    dispatch(
      get({
        searchQuery: '*',
        limit: 20,
        skip: 0,
        filters: [],
      })
    );
  }, [dispatch]);

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
        <RoomsSearch />
        <RoomsFilter />
        {data?.length === 0 ? (
          <>No rooms found</>
        ) : (
          <SimpleGrid minChildWidth="364px" spacing={10}>
            {data?.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </SimpleGrid>
        )}
      </Container>
      <CreateRoomModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Room;
