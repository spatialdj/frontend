import React from 'react';
import {
  Container,
  Heading,
  Text,
  ButtonGroup,
  Button,
  
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import GradientBackground from 'components/GradientBackground';
import { Link } from 'react-router-dom';

const VerticalHeading = styled.div`
  writing-mode: sideways-lr;
  font-weight: 900;
  font-size: 288px;
  line-height: 288px;
  mix-blend-mode: overlay;
  overflow: hidden;
  opacity: 0.25;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 0;
  margin: 0;
  pointer-events: none;
`;

function Home() {
  return (
    <GradientBackground>
      <Container
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
        minH="80%"
      >
        <Heading as="h1" size="4xl">
          LISTEN TO MUSIC WITH YOUR FRIENDS.
        </Heading>
        <Text fontSize="xl" mt="12px">
          Create a room or join a public room. Make friends through music.
        </Text>
        <ButtonGroup variant="outline" spacing="6" mt="48px">
          <Button size="lg" colorScheme="blue">
            Create Room
          </Button>
          <Button size="lg">
          <Link to="/rooms">View Rooms</Link>  
          </Button>
        </ButtonGroup>
      </Container>
      <VerticalHeading>SPATIAL</VerticalHeading>
    </GradientBackground>
  );
}

export default Home;
