import React, { useState } from 'react';
import { VStack, Input, Button, Text, Box, Heading, useToast } from 'native-base';
import axios from 'axios';
import Config from 'react-native-config';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    birthDate: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${Config.API_BASE_URL}api/account/register`, formData);
      toast.show({
        title: 'Success',
        description: 'User registered successfully!',
        status: 'success',
      });
      console.log(response.data);
      navigation.navigate('Login');
    } catch (error) {
      toast.show({
        title: 'Error',
        description: error.response?.data?.message || 'Registration failed.',
        status: 'error',
      });
      console.error('Error registering user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box safeArea p="5" flex={1} justifyContent="center" bg="white">
      <Heading size="lg" mb="6" textAlign="center">
        Register
      </Heading>

      <VStack space={4}>
        <Input
          placeholder="Full Name"
          value={formData.fullName}
          onChangeText={(value) => handleChange('fullName', value)}
        />

        <Input
          placeholder="Email"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(value) => handleChange('email', value)}
        />

        <Input
          placeholder="Birth Date (YYYY-MM-DD)"
          value={formData.birthDate}
          onChangeText={(value) => handleChange('birthDate', value)}
        />

        <Input
          placeholder="Password"
          secureTextEntry
          value={formData.password}
          onChangeText={(value) => handleChange('password', value)}
        />

        <Button isLoading={loading} onPress={handleRegister} mt="4">
          Register
        </Button>

        <Text textAlign="center" mt="4">
          Already have an account?{' '}
          <Text
            color="blue.500"
            onPress={() => navigation.navigate('Login')}
          >
            Login here
          </Text>
        </Text>
      </VStack>
    </Box>
  );
};

export default RegisterScreen;
