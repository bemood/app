import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Box} from "native-base";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

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
    </Box>
  );
}