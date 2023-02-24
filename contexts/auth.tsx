import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useState, ReactNode, useEffect} from 'react';

export type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(credentials: any): Promise<void>;
  signOut(): void;
};
    
export type AuthData = {
  auth_token: string;
  user: any;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [authData, setAuthData] = useState<AuthData>();
  
  //The loading part will be explained in the persist step session
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Every time the App is opened, this provider is rendered
    //and call de loadStorageData function.
    loadStorageData().then(() => {
      whoami();
    });
  }, []);

  async function whoami(): Promise<void> {
    try {
      const response = await axios.get('/users/me')

      if (response.data && authData?.auth_token) {
        setAuthData({ ...authData, user: response.data })
      }
    } catch (error) {
      signOut();
    }
  }

  async function loadStorageData(): Promise<void> {
    try {
      //Try get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        //If there are data, it's converted to an Object and the state is updated.
        const _authData: AuthData = JSON.parse(authDataSerialized);
        setAuthData(_authData);

        axios.defaults.headers.common['Authorization'] = _authData?.auth_token;
      }
    } catch (error) {
    } finally {
      //loading finished
      setLoading(false);
    }
  }
  const signIn = async (credentials: any) => {
    //call the service passing credential (email and password).
    //In a real App this data will be provided by the user from some InputText components.
    const _authData = await (await axios.post('/authenticate', credentials)).data

    //Set the data in the context, so the App can be notified
    //and send the user to the AuthStack
    setAuthData(_authData);

    //Persist the data in the Async Storage
    //to be recovered in the next user session.
    AsyncStorage.setItem('@AuthData', JSON.stringify(_authData));
  };

  const signOut = async () => {
    //Remove data from context, so the App can be notified
    //and send the user to the AuthStack
    setAuthData(undefined);

    //Remove the data from Async Storage
    //to NOT be recovered in next session.
    await AsyncStorage.removeItem('@AuthData');
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider value={{authData, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};