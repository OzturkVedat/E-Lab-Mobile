import React, { useState } from 'react';
import { VStack, Input, Button, Text, Box, Heading, useToast, Link } from 'native-base';
import axios from 'axios';
import Config from 'react-native-config';

const LoginScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${Config.API_BASE_URL}api/account/login`, formData);
      toast.show({
        title: 'Success',
        description: 'Login successful!',
        status: 'success',
      });
      console.log(response.data);
    } catch (error) {
      toast.show({
        title: 'Error',
        description: error.response?.data?.message || 'Login failed.',
        status: 'error',
      });
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box safeArea p="5" flex={1} justifyContent="center" bg="white">
      <Heading size="lg" mb="6" textAlign="center">
        Login
      </Heading>

      <VStack space={4}>
        <Input
          placeholder="Email"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(value) => handleChange('email', value)}
        />

        <Input
          placeholder="Password"
          secureTextEntry
          value={formData.password}
          onChangeText={(value) => handleChange('password', value)}
        />

        <Button isLoading={loading} onPress={handleLogin} mt="4">
          Login
        </Button>

        <Text textAlign="center" mt="4">
          Don't have an account?{' '}
          <Text
            color="blue.500"
            onPress={() => navigation.navigate('Register')}
          >
            Register here
          </Text>
        </Text>
      </VStack>
    </Box>
  );
};

export default LoginScreen;
