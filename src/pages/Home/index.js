import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  ButtonGroup,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet-async';
import CreateRoomModal from 'components/CreateRoomModal';
import { Link } from 'react-router-dom';

const VerticalHeading1 = styled.div`
  z-index: -1;
  color: black;
  font-weight: 900;
  font-size: 288px;
  line-height: 288px;
  mix-blend-mode: overlay;
  overflow: hidden;
  opacity: 0.25;
  position: absolute;
  right: 0;
  top: 0;
  padding: 0;
  margin: 0;
  pointer-events: none;
`;

const VerticalHeading2 = styled.div`
  z-index: -1;
  color: black;
  font-weight: 700;
  font-size: 188px;
  line-height: 188px;
  mix-blend-mode: overlay;
  overflow: hidden;
  opacity: 0.1;
  position: absolute;
  left: 0;
  bottom: 120px;
  padding: 0;
  margin: 0;
  pointer-events: none;
`;

function Home(props) {
  const { user } = props;
  // Handles create room modal opening and closing
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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
    <Box overflow="hidden">
      <Helmet>
        <title>Spatial.dj</title>
      </Helmet>
      <Container
        h="calc(100vh - 72px)"
        d="flex"
        justifyContent="center"
        flexDir="column"
        maxW={{
          base: 'container.sm',
          sm: 'container.sm',
          md: 'container.md',
          lg: 'container.lg',
          xl: 'container.xl',
        }}
        color="white"
      >
        <Heading as="h1" size="4xl">
          LISTEN TO MUSIC WITH YOUR FRIENDS.
        </Heading>
        <Text fontSize="xl" mt="12px">
          Create a room or join a public room. Make friends through music.
        </Text>
        <ButtonGroup variant="outline" spacing="6" mt="48px">
          <Link to="/rooms">
            <Button colorScheme="blue" variant="solid" size="lg">
              View Rooms
            </Button>
          </Link>
          <Button size="lg" onClick={handleOpenCreateRoom}>
            Create Room
          </Button>
        </ButtonGroup>
      </Container>
      <VerticalHeading1>SPATIAL</VerticalHeading1>
      <VerticalHeading2>SPATIAL</VerticalHeading2>
      <CreateRoomModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default Home;
