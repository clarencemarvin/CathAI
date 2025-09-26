import { FontFamilies } from "@/helpers/FontFamiles";
import { normalize } from "@/helpers/useScaling";
import { TicketCard } from "@/views/ticketing/TicketCard";
import { TransitRoute } from "@/views/ticketing/TransitRoute";
import WeatherCard from "@/views/ticketing/WeatherCard";
import { router } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import JourneySegment from "../(suggest)/JourneySegment";
import { NavigationGuide } from "@/views/ticketing/NavigationGuide";

export default function ManageBooking() {
  const journeySegments = [
    {
      from: {
        code: "CGK",
        name: "Soekarno-Hatta Int'l",
        terminal: "Terminal 3",
      },
      to: {
        code: "HKG",
        name: "Hong Kong Int'l (HKG)",
        terminal: "Terminal 1",
      },
      departureTime: "10:10",
      arrivalTime: "15:00",
      duration: "4h 50m",
      transportType: "plane" as const,
      carbonEmissions: 382,
      flightNumber: "CX 5624",
    },
    {
      from: { code: "HKG", name: "Hong Kong Int'l", terminal: "Terminal 1" },
      to: { code: "SZX", name: "Shenzhen", terminal: "Ferry Terminal" },
      departureTime: "16:00",
      arrivalTime: "17:00",
      duration: "1h",
      transportType: "ferry" as const,
      carbonEmissions: 12,
      flightNumber: "TurboJET 516",
    },
  ];

  const transits = journeySegments.map((ticket) => ({
    from: ticket.from.code,
    to: ticket.to.code,
    transportType:
      ticket.transportType === "plane" ? "flight" : ticket.transportType,
  }));

  const destinations: WeatherInfo[] = Array.from(
    new Set(
      journeySegments.reduce((locations, ticket) => {
        locations.push(ticket.from.code);
        locations.push(ticket.to.code);
        return locations;
      }, [] as string[])
    )
  ).map((location) => {
    const mockWeatherData = {
      CGK: { temperature: 27, condition: "sunny" as const },
      HKG: { temperature: 23, condition: "rainy" as const },
      SZX: { temperature: 22, condition: "rainy" as const },
      FYG: { temperature: 25, condition: "rainy" as const },
    };

    return {
      location,
      ...mockWeatherData[location as keyof typeof mockWeatherData],
    };
  });

  return (
    <ScrollView
      style={{ paddingTop: normalize(24), backgroundColor: "#F8F7F7" }}
    >
      <Text
        style={{
          marginHorizontal: normalize(20),
          fontSize: normalize(24),
          color: "black",
        }}
      >
        You've arrived in Hong Kong.
      </Text>
      <View style={{ paddingHorizontal: normalize(20) }}>
        <TransitRoute transits={transits} position={"HKG"} />
      </View>
      <View
        style={{
          backgroundColor: "white",
          marginBottom: 16,
          marginHorizontal: normalize(20),
          borderRadius: 14,
          paddingHorizontal: 20,
          paddingBottom: 24,
          paddingTop: 16,
          shadowColor: "#000",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3,
        }}
      >
        <Text
          style={{
            color: "#444A54",
            fontSize: normalize(14),
          }}
        >
          Mon 11 Nov 2024 {""} | {""} CX 5624
        </Text>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text
            style={{
              fontFamily: FontFamilies.GTWalsheimBold,
              color: "#006564",
              fontSize: normalize(16),
            }}
          >
            Jakarta
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: 16,
              fontFamily: FontFamilies.GTWalsheimRegular,
            }}
          >
            {" "}
            to{" "}
          </Text>
          <Text
            style={{
              fontFamily: FontFamilies.GTWalsheimBold,
              color: "#006564",
              fontSize: 16,
            }}
          >
            Shenzhen
          </Text>
        </View>

        {journeySegments.map((segment, index) => (
          <JourneySegment key={index} {...segment} />
        ))}
        <Text
          style={{
            position: "absolute",
            bottom: 146,
            left: 130,
            fontSize: 12,
            color: "#303436",
            fontFamily: FontFamilies.GTWalsheimRegular,
            textAlign: "center",
          }}
        >
          Transit:{" "}
          <Text style={{ fontFamily: FontFamilies.GTWalsheimBold }}>1h </Text>
          <Text>at </Text>
          <Text style={{ fontFamily: FontFamilies.GTWalsheimBold }}>HKG</Text>
        </Text>
      </View>
      <Text
        style={{
          fontSize: normalize(24),
          color: "black",
          marginTop: normalize(16),
          paddingHorizontal: normalize(20),
        }}
      >
        Weather updates
      </Text>
      <Text
        style={{
          fontSize: normalize(20),
          marginTop: normalize(8),
          marginBottom: normalize(12),
          paddingHorizontal: normalize(20),
          color: "#B0B2B3",
        }}
      >
        11 Nov
      </Text>
      <View
        style={{
          paddingHorizontal: normalize(20),
          paddingBottom: normalize(16),
        }}
      >
        <WeatherCard destinations={destinations} />
      </View>
      <Text
        style={{
          fontSize: normalize(24),
          color: "black",
          marginTop: normalize(16),
          marginBottom: normalize(12),
          paddingHorizontal: normalize(20),
        }}
      >
        Navigation guide
      </Text>
      <View style={{ paddingBottom: normalize(64) }}>
        <NavigationGuide
          steps={[
            {
              id: 1,
              instruction: "Follow signs to Mainland/Macau Ferries",
              imageUrl: require("@/assets/images/mainland-ferry-signs.png"),
              icon: "navigate-outline", // Changed from 'directions-sign'
              estimatedTime: 5,
              details:
                "Look for clear signage directing to Mainland/Macau Ferries, not Transfer gate",
            },
            {
              id: 2,
              instruction: "Check in at TurboJET counter",
              imageUrl: require("@/assets/images/turbojet-counter.png"),
              icon: "boat-outline", // Already correct
              estimatedTime: 10,
              details: "Located at Level 5, Transfer Area E2",
            },
            {
              id: 3,
              instruction: "Use Ferry Ticket Reader at boarding gate",
              imageUrl: require("@/assets/images/ferry-reader.png"),
              icon: "card-outline", // Changed from 'card-reader'
              estimatedTime: 2,
              details: "Alternative check-in method available at Level 5",
            },
            {
              id: 4,
              instruction: "Present SkyPier ferry ticket at APM entrance",
              imageUrl: require("@/assets/images/apm-entrance.png"),
              icon: "ticket-outline", // Changed to include '-outline'
              estimatedTime: 3,
              details: "Have your ticket ready for verification",
            },
            {
              id: 5,
              instruction: "Take APM to SkyPier",
              imageUrl: require("@/assets/images/apm.png"),
              icon: "train-outline", // Changed to include '-outline'
              estimatedTime: 5,
              details: "Automated People Mover will transport you to SkyPier",
            },
            {
              id: 6,
              instruction: "Follow signs to your boarding gate",
              imageUrl: require("@/assets/images/boarding-gate.png"),
              icon: "enter-outline", // Changed from 'gate'
              estimatedTime: 5,
              details:
                "Clear directional signs will guide you to your specific boarding gate",
            },
          ]}
        />
      </View>
    </ScrollView>
  );
}
