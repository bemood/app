import { Box, Heading, VStack, FormControl, Input, Button, Center, Text, Link, Flex } from "native-base";
import { useState } from "react";
import axios from "axios";
import { Logo } from "../../components/logo";

export interface RegisterData {
  email: string;
  name: string;
  password: string
  password_confirmation: string;
}

const initialRegisterData: RegisterData = {
  email: '',
  name: '',
  password: '',
  password_confirmation: '',
};

export default function RegisterScreen({ navigation }: any) {
  const [data, setData] = useState<RegisterData>(initialRegisterData);

  const register = () => {
    axios.post('/users', data)
      .then(response => {
        console.log('response:', response.data)
        navigation.navigate("Login")
      })
      .catch((error) => {
        console.log('error:', error.response?.data)
      });
  };

  return (
    <Center w="100%" h="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Logo />

        <Heading
          mt="1"
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
          textAlign={"center"}
        >
          Create an account !
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Input value={data.name} onChangeText={(value) => setData({ ...data, name: value })} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input value={data.email} onChangeText={(value) => setData({ ...data, email: value })} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" value={data.password} onChangeText={(value) => setData({ ...data, password: value })} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input type="password" value={data.password_confirmation} onChangeText={(value) => setData({ ...data, password_confirmation: value })} />
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={register}>
            Register
          </Button>
        </VStack>

        <Flex 
          mt={10} 
          flexDirection={"row"}
          justifyContent={"center"} 
          alignItems={"center"}
        >
          <Text>Already an account ? </Text>
          <Link 
            colorScheme={"indigo"}
            fontWeight={"bold"}
            onPress={() => navigation.navigate('Login')}
          >
            Login
          </Link>
        </Flex>
      </Box>
    </Center>
  );
}