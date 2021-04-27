import React from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Heading,
  Stack,
} from '@chakra-ui/react';
import GradientBackground from 'components/GradientBackground';

function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClick = () => setShowPassword(!showPassword);

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
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Username"
                  _placeholder={{ color: 'white' }}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    _placeholder={{ color: 'white' }}
                  />
                  <InputRightElement>
                    <IconButton
                      onClick={handleClick}
                      variant="ghost"
                      size="sm"
                      icon={showPassword ? <HiEyeOff /> : <HiEye />}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                type="submit"
                colorScheme="purple"
                size="lg"
                fontSize="md"
              >
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
