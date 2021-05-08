import React, { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SocketContext } from 'contexts/socket';
import { useDispatch } from 'react-redux';
import { createRoom } from 'slices/currentRoomSlice';
import {
  useColorModeValue,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Switch,
  useToast,
} from '@chakra-ui/react';
import TagsSelector from 'components/TagsSelector';

const validateRoomName = value => {
  return value ? true : 'Room name is required';
};

const validateDescription = value => {
  return value ? true : 'Description is required';
};

function CreateRoomModal(props) {
  const { isOpen, onClose } = props;
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const initialFocusRef = useRef(); // For auto focus input on open
  const tagsRef = useRef([]); // To store genre tags
  const socket = useContext(SocketContext); // socket.io to create room
  const history = useHistory();
  const dispatch = useDispatch();
  const toast = useToast();

  const handleCreateRoom = values => {
    // TODO: create the room
    // Remember to show a loading indicator
    // Send POST request
    // Open socket.io connection
    // Redirect to room
    const dataToSubmit = {
      name: values.roomName,
      description: values.description,
      genres: tagsRef?.current?.map(tag => tag.value) ?? [],
      private: values.privateRoom,
    };
    return new Promise(resolve => {
      socket.emit('create_room', dataToSubmit, response => {
        const { success, room } = response;
        if (success && room?.id) {
          // Redirect to room page
          dispatch(createRoom(response));
          resolve();
          onClose();
          history.push(`/room/${room.id}`);
        } else {
          toast({
            title: 'Error creating room',
            description: "Couldn't create a room, please try again",
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
          resolve();
        }
        // console.log('create_room', response);
      });
    });
  };

  return (
    <Modal
      initialFocusRef={initialFocusRef}
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
    >
      <ModalOverlay />
      <ModalContent bg={useColorModeValue('white', 'gray.900')} color="white">
        <form onSubmit={handleSubmit(handleCreateRoom)}>
          <ModalHeader>Create Room</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack px={4} py={5} spacing={6} p={{ sm: 6 }}>
              <FormControl isInvalid={errors.roomName}>
                <FormLabel
                  htmlFor="roomName"
                  fontSize="sm"
                  fontWeight="md"
                  color={useColorModeValue('gray.700', 'gray.50')}
                >
                  Room name
                </FormLabel>
                <Input
                  name="roomName"
                  {...register('roomName', {
                    validate: validateRoomName,
                  })}
                  ref={initialFocusRef}
                  type="tel"
                  placeholder="A cool name"
                  rounded="md"
                />
                <FormErrorMessage>
                  {errors.roomName && errors.roomName.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.description} id="email" mt={1}>
                <FormLabel
                  htmlFor="description"
                  fontSize="sm"
                  fontWeight="md"
                  color={useColorModeValue('gray.700', 'gray.50')}
                >
                  Description
                </FormLabel>
                <Textarea
                  name="description"
                  {...register('description', {
                    validate: validateDescription,
                  })}
                  placeholder="We'll be listening to some cool tracks here"
                  mt={1}
                  rows={3}
                  shadow="sm"
                  fontSize={{ sm: 'sm' }}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
                <FormHelperText>
                  Describe what you&apos;ll be doing in this room.
                </FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel
                  htmlFor="genres"
                  fontSize="sm"
                  fontWeight="md"
                  color={useColorModeValue('gray.700', 'gray.50')}
                >
                  Tags
                </FormLabel>
                <TagsSelector name="genres" ref={tagsRef} />
                <FormHelperText>Choose up to three genres.</FormHelperText>
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="privateRoom">Private room?</FormLabel>
                <Switch {...register('privateRoom')} name="privateRoom" />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isLoading={isSubmitting}
              type="submit"
            >
              Create
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default CreateRoomModal;
