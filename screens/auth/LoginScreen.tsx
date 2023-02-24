import {Box, Button, Center, FormControl, Heading, Input, Link, VStack, Flex, Text} from "native-base";
import {useState} from "react";
import axios from "axios";
import { Logo } from "../../components/logo";

export interface LoginData {
  email: string;
  password: string;
}

const initialLoginData: LoginData = {
  email: '',
  password: '',
};

export default function LoginScreen({ navigation }: any) {
  const [data, setData] = useState<LoginData>(initialLoginData);

  const login = () => {
    axios.post('/authenticate', data)
      .then(response => {
        console.log('response: ', response.data)
        navigation.navigate("Home")
      })
      .catch(error => {
        console.log('error: ', error.response?.data)
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
          Login
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input value={data.email} onChangeText={(value) => setData({...data, email: value})} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" value={data.password} onChangeText={(value) => setData({...data, password: value})} />
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={login}>
            Login
          </Button>
        </VStack>

        <Flex 
          mt={10} 
          flexDirection={"row"}
          justifyContent={"center"} 
          alignItems={"center"}
        >
          <Text>You don't have an account ? </Text>
          <Link 
            colorScheme={"indigo"}
            fontWeight={"bold"}
            onPress={() => navigation.navigate('Register')}
          >
            Register
          </Link>
        </Flex>
      </Box>
    </Center>
  );
}