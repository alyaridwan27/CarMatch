import { Stack } from "expo-router";
import{useFonts} from "expo-font";

export default function RootLayout() {
  useFonts({
    'outfit':require('./../assets/fonts/Outfit-Regular.ttf'),
    'oufit-medium':require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold':require('./../assets/fonts/Outfit-Bold.ttf'),
  })
  return (
  <Stack>
    {/* <Stack.Screen name="index" options={{
          headerShown:false
        }}/> */}
        <Stack.Screen name="(tabs)"/>

  </Stack>
  );
}
