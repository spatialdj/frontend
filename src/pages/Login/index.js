import React from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Stack,
} from '@chakra-ui/react';
import GradientBackground from 'components/GradientBackground';

function Login() {
  return (
    <GradientBackground>
      <Box maxW="md" mx="auto" py="5%">
        <Heading textAlign="center" size="xl" padding="1rem">
          Login
        </Heading>
        <Box
          bg="gray.900"
          py="8"
          px={{ base: '4', md: '10' }}
          shadow="base"
          rounded={{ sm: 'lg' }}
        >
          <form>
            <Stack spacing="6">
              <FormControl id="email" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="email"
                  placeholder="Username"
                  _placeholder={{ color: 'white' }}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Password"
                  _placeholder={{ color: 'white' }}
                />
              </FormControl>
              <Button colorScheme="purple" size="lg" fontSize="md">
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </GradientBackground>
  );
}

export default Login;
