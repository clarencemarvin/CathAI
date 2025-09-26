import { View, Text } from "react-native";
import { FontFamilies } from "@/helpers/FontFamiles";
import { normalize } from "@/helpers/useScaling";
import { Ionicons } from "@expo/vector-icons";

export type WeatherInfo = {
  location: string;
  temperature: number;
  condition: "sunny" | "rainy" | "cloudy";
};

interface WeatherCardProps {
  destinations: WeatherInfo[];
}

const weatherIcons: Record<WeatherInfo["condition"], string> = {
  sunny: "sunny-outline",
  rainy: "rainy-outline",
  cloudy: "cloudy-outline",
};

const getWeatherIcon = (condition: WeatherInfo["condition"]): string => {
  return weatherIcons[condition] || weatherIcons.sunny;
};

export default function WeatherCard({ destinations }: WeatherCardProps) {
  const isTwoDestinations = destinations.length === 2;

  return (
    <View
      style={{
        paddingVertical: normalize(24),
        paddingHorizontal: 24,
        backgroundColor: "#fff",
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {destinations.map((dest, index) => (
          <View
            key={dest.location}
            style={{
              alignItems: isTwoDestinations
                ? "center"
                : index === 0
                ? "flex-start"
                : index === destinations.length - 1
                ? "flex-end"
                : "center",
              flex: 1,
            }}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text
                style={{
                  color: "#006564",
                  fontSize: normalize(16),
                  fontFamily: FontFamilies.GTWalsheimBold,
                }}
              >
                {dest.location}
              </Text>
              <View style={{ marginVertical: normalize(8) }}>
                <Ionicons
                  name={getWeatherIcon(dest.condition)}
                  size={normalize(24)}
                  color={"#303436"}
                />
              </View>
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: FontFamilies.GTWalsheimBold,
                  color: "#303436",
                }}
              >
                {dest.temperature}°C
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
