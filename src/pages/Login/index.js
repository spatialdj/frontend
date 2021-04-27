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
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import GradientBackground from 'components/GradientBackground';

function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  // Todo: make the callout to backend api on submit
  const onSubmit = data => console.log(data);

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="6">
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  {...register('username', { required: true })}
                  placeholder="Username"
                  _placeholder={{ color: 'white' }}
                />
                {errors.username && (
                  <Text color="red.500">Username is required.</Text>
                )}
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    {...register('password', { required: true })}
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
                {errors.password && (
                  <Text color="red.500">Password is required.</Text>
                )}
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
