import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { normalize } from "@/helpers/useScaling";
import BackButton from "@/components/navigation/BackButton";
import { FontFamilies } from "@/helpers/FontFamiles";

export default function TicketLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="checkout"
          options={{
            title: "Summary and payment",
            headerTintColor: "#444A54",
            headerTitleStyle: {
              fontFamily: FontFamilies.GTWalsheimMedium,
              fontSize: normalize(18),
            },
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="journey"
          options={{
            title: "Your journey",
            headerTintColor: "#444A54",
            headerTitleStyle: {
              fontFamily: FontFamilies.GTWalsheimMedium,
              fontSize: normalize(18),
            },
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="landingPage"
          options={{
            title: "Choose Flights",
            headerTintColor: "#444A54",
            headerTitleStyle: {
              fontFamily: FontFamilies.GTWalsheimMedium,
              fontSize: normalize(20),
            },
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="ticket"
          options={{
            title: "Booking",
            headerTintColor: "#444A54",
            headerTitleStyle: {
              fontFamily: FontFamilies.GTWalsheimMedium,
              fontSize: normalize(20),
            },
            headerLeft: () => <BackButton />,
          }}
        />
        <Stack.Screen
          name="success"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
