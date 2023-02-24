import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Box, Button} from "native-base";
import { useAuth } from "../hooks/useAuth";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const auth = useAuth();

  return (
    <Box
      flex={1}
      justifyContent={'space-between'}
      alignItems={'center'}
      paddingTop={insets.top}
      paddingBottom={insets.bottom}
      paddingLeft={insets.left}
      paddingRight={insets.right}
    >
      Hello World !

      <Button onPress={auth.signOut}>Logout</Button>
    </Box>
  );
}