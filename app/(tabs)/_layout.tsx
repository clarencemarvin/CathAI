import BackButton from "@/components/navigation/BackButton";
import { FontFamilies } from "@/helpers/FontFamiles";
import { normalize } from "@/helpers/useScaling";
import { Stack } from "expo-router";
import "react-native-reanimated";

export default function QuizzesLayout() {

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="navigation"
        options={{
          title: "Directions",
          headerTitleStyle: {
            fontFamily: FontFamilies.GTWalsheimMedium,
            fontSize: normalize(20),
          },
          headerShown: true,
          headerTitleAlign: "center",
          headerLeft: () => (
            <BackButton/>
          ),
        }}
      />
    </Stack>
  );
}
