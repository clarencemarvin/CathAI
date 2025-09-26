import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { normalize } from "@/helpers/useScaling";

type TransportSegment = {
  id: string;
  type: "plane" | "ferry" | "train" | "bus";
  identifier: string;
  date: string;
  departureTime: string;
  departureLocation: string;
  arrivalTime: string;
  arrivalLocation: string;
  duration: string;
  class: string;
  price: number;
  currency: string;
};

type Journey = {
  id: string;
  type: "outbound" | "return";
  segments: TransportSegment[];
};

type JourneySegmentProps = {
  segment: TransportSegment;
  isLastSegment?: boolean;
};

function JourneySegment({ segment, isLastSegment }: JourneySegmentProps) {
  const getTransportIcon = (type: TransportSegment["type"]) => {
    switch (type) {
      case "plane":
        return "airplane-sharp";
      case "ferry":
        return "boat";
      case "train":
        return "train";
      case "bus":
        return "bus";
    }
  };

  return (
    <View style={{ marginBottom: isLastSegment ? 0 : normalize(8) }}>
      <View
        style={{
          flexDirection: "row",
          marginBottom: normalize(4),
        }}
      >
        <View
          style={{
            borderRightWidth: 0.75,
            paddingRight: 8,
            marginRight: 8,
            borderColor: "rgba(68, 74, 84, 0.6)",
          }}
        >
          <Text style={{ fontSize: normalize(16), color: "#444a54" }}>
            {segment.date}
          </Text>
        </View>
        <View>
          <Text style={{ color: "#444a54" }}>{segment.identifier}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontSize: normalize(16),
              color: "#444a54",
              fontWeight: "bold",
            }}
          >
            {segment.departureLocation}
          </Text>
          <Text
            style={{
              fontSize: normalize(16),
              color: "#444a54",
              marginHorizontal: 8,
            }}
          >
            {segment.departureTime}
          </Text>
          <Ionicons
            name={getTransportIcon(segment.type)}
            size={normalize(16)}
            color="#006564"
          />
          <Text
            style={{
              fontSize: normalize(16),
              color: "#444a54",
              fontWeight: "bold",
              marginLeft: 8,
            }}
          >
            {segment.arrivalLocation}
          </Text>
          <Text
            style={{
              fontSize: normalize(16),
              color: "#444a54",
              marginLeft: 8,
            }}
          >
            {segment.arrivalTime}
          </Text>
        </View>
        <Ionicons name="chevron-up" size={normalize(18)} color="#006564" />
      </View>
    </View>
  );
}
type JourneyCardProps = {
  journey: Journey;
};

function JourneyCard({ journey }: JourneyCardProps) {
  const getJourneyTitle = () => {
    const firstSegment = journey.segments[0];
    const lastSegment = journey.segments[journey.segments.length - 1];
    return `${firstSegment.departureLocation} → ${lastSegment.arrivalLocation}`;
  };

  return (
    <View style={{ backgroundColor: "#fff", marginBottom: normalize(16) }}>
      <View style={{ marginHorizontal: 20, marginTop: normalize(20) }}>
        <Text
          style={{
            fontSize: normalize(20),
            color: "rgba(68, 74, 84, 0.74)",
            marginBottom: 8,
          }}
        >
          {journey.type === "outbound" ? "Outbound flight" : "Return flight"}
        </Text>
      </View>
      <View style={{ backgroundColor: "#e5eff0" }}>
        <Text
          style={{
            marginHorizontal: 20,
            color: "#006564",
            paddingVertical: normalize(8),
            fontSize: normalize(16),
          }}
        >
          {journey.segments[0].class}
        </Text>
      </View>
      <View style={{ marginHorizontal: 20, marginVertical: normalize(16) }}>
        {journey.segments.map((segment, index) => (
          <JourneySegment
            key={segment.id}
            segment={segment}
            isLastSegment={index === journey.segments.length - 1}
          />
        ))}
      </View>
    </View>
  );
}

export default function CheckoutScreen() {
  const journeys: Journey[] = [
    {
      id: "outbound",
      type: "outbound",
      segments: [
        {
          id: "cgk-hkg",
          type: "plane",
          identifier: "CX 5624",
          date: "Mon 11 Nov 2024",
          departureTime: "10:10",
          departureLocation: "CGK",
          arrivalTime: "15:00",
          arrivalLocation: "HKG",
          duration: "4h 50m",
          class: "Economy",
          price: 4860000,
          currency: "IDR",
        },
        {
          id: "hkg-szx",
          type: "ferry",
          identifier: "TurboJET 516",
          date: "Mon 11 Nov 2024",
          departureTime: "16:00",
          departureLocation: "HKG",
          arrivalTime: "17:00",
          arrivalLocation: "SZX",
          duration: "1h",
          class: "Economy",
          price: 418000,
          currency: "IDR",
        },
      ],
    },
    // Uncomment for return journey
    /*{
      id: "return",
      type: "return",
      segments: [
        {
          id: "szx-hkg",
          type: "ferry",
          identifier: "TurboJET 517",
          date: "Mon 18 Nov 2024",
          departureTime: "10:00",
          departureLocation: "SZX",
          arrivalTime: "11:00",
          arrivalLocation: "HKG",
          duration: "1h",
          class: "Economy",
          price: 418000,
          currency: "IDR",
        },
        {
          id: "hkg-cgk",
          type: "plane",
          identifier: "CX 5625",
          date: "Mon 18 Nov 2024",
          departureTime: "13:10",
          departureLocation: "HKG",
          arrivalTime: "18:00",
          arrivalLocation: "CGK",
          duration: "4h 50m",
          class: "Economy",
          price: 4860000,
          currency: "IDR",
        },
      ],
    },*/
  ];

  const totalFare = journeys.reduce(
    (total, journey) =>
      total + journey.segments.reduce((sum, segment) => sum + segment.price, 0),
    0
  );
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <ScrollView style={{ backgroundColor: "#F8F7F7" }}>
        {journeys.map((journey) => (
          <JourneyCard key={journey.id} journey={journey} />
        ))}

        {/* Passengers */}
        <View style={{ marginBottom: normalize(16) }}>
          <Text
            style={{
              fontSize: normalize(20),
              color: "rgba(68, 74, 84, 0.74)",
              marginBottom: normalize(16),
              marginHorizontal: 20,
            }}
          >
            Passengers
          </Text>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingVertical: normalize(16),
              backgroundColor: "#fff",
              gap: 8,
              alignItems: "center",
            }}
          >
            <Ionicons
              name="person-circle-outline"
              size={normalize(32)}
              color={"#444A54"}
            />
            <Text style={{ fontSize: normalize(20), color: "#444A54" }}>
              Mr Anggawijaya Howard
            </Text>
          </View>
        </View>

        {/* Payment Breakdown */}
        <View>
          <Text
            style={{
              fontSize: normalize(20),
              color: "rgba(68, 74, 84, 0.74)",
              marginBottom: normalize(16),
              marginHorizontal: 20,
            }}
          >
            Payment breakdown
          </Text>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: normalize(24),
              backgroundColor: "#fff",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: normalize(16),
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: normalize(24), color: "#444A54" }}>
                Total fare
              </Text>
              <Text style={{ fontSize: normalize(20), color: "#444A54" }}>
                IDR
                <Text style={{ fontWeight: "bold" }}>
                  {totalFare.toLocaleString()}
                </Text>
              </Text>
            </View>

            {journeys.map((journey) =>
              journey.segments.map((segment) => (
                <View
                  key={segment.id}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: normalize(8),
                  }}
                >
                  <Text style={{ color: "#444A54", fontSize: normalize(16) }}>
                    {segment.departureLocation} - {segment.arrivalLocation}
                  </Text>
                  <Text style={{ color: "#444A54", fontSize: normalize(16) }}>
                    IDR {segment.price.toLocaleString()}
                  </Text>
                </View>
              ))
            )}

            <TouchableOpacity style={{ marginTop: normalize(8) }}>
              <Text style={{ color: "#006564", fontSize: normalize(16) }}>
                View price breakdown
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Payment Section */}
      <View
        style={{
          width: "100%",
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: normalize(16),
            borderTopWidth: 1,
            borderTopColor: "#E5E5E5",
          }}
        >
          <Text style={{ fontSize: normalize(20), color: "#444A54" }}>
            Total fare
          </Text>
          <Text style={{ fontSize: normalize(20), color: "#444A54" }}>
            IDR
            <Text style={{ fontWeight: "bold" }}>
              {totalFare.toLocaleString()}
            </Text>
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20, paddingBottom: 32 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#006564",
              paddingVertical: 16,
              borderRadius: 4,
              alignItems: "center",
            }}
            onPress={() => router.push("../(ticket)/success")}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: normalize(16),
                fontWeight: "500",
              }}
            >
              Pay now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
