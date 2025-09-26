import {
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import { FontFamilies } from "@/helpers/FontFamiles";
import { normalize } from "@/helpers/useScaling";
import { Ionicons } from "@expo/vector-icons";

type TicketCardProps = {
  transportType: "plane" | "ferry" | "train" | "bus";
  identifier: string;
  duration: string;
  departureTime: string;
  departureLocation: string;
  arrivalTime: string;
  arrivalLocation: string;
  carbonEmissions: number;
  class: string;
  currency: string;
  price: number;
  onSelect?: () => void;
  onViewDetails?: () => void;
  style?: StyleProp<ViewStyle>;
  variant?: "journey" | "ticket";
};

export function TicketCard({
  transportType,
  identifier,
  duration,
  departureTime,
  departureLocation,
  arrivalTime,
  arrivalLocation,
  carbonEmissions,
  class: transportClass,
  currency,
  price,
  onSelect,
  onViewDetails,
  style,
  variant = "ticket",
}: TicketCardProps) {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 20,
        },
        style,
      ]}
    >
      <View
        style={{
          flex: 7,
          backgroundColor: "#fff",
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          paddingVertical: 8,
          paddingHorizontal: 20,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              color: "rgba(68, 74, 84, 0.8)",
              fontSize: normalize(10),
              alignItems: "flex-start",
            }}
          >
            {identifier}
          </Text>
          <Text
            style={{
              color: "rgba(68, 74, 84, 0.8)",
              fontSize: normalize(10),
              alignItems: "flex-end",
            }}
          >
            {duration}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 20,
          }}
        >
          <View style={{ marginRight: 16 }}>
            <Text style={{ fontSize: normalize(18), marginBottom: 4 }}>
              {departureTime}
            </Text>
            <Text
              style={{
                fontSize: normalize(18),
                color: "#006564",
                fontFamily: FontFamilies.GTWalsheimBold,
              }}
            >
              {departureLocation}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              flexDirection: "row",
            }}
          >
            <Ionicons
              name={
                transportType === "train"
                  ? "train"
                  : transportType === "ferry"
                  ? "boat"
                  : transportType === "bus"
                  ? "bus"
                  : "airplane"
              }
              size={normalize(24)}
              color="#006564"
            />
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: "#E5E6E7",
              }}
            />
            <Ionicons name="ellipse" size={normalize(8)} color="#E5E6E7" />
          </View>
          <View style={{ marginLeft: 16, alignItems: "flex-end" }}>
            <Text style={{ fontSize: normalize(18), marginBottom: 4 }}>
              {arrivalTime}
            </Text>
            <Text
              style={{
                fontSize: normalize(18),
                color: "#006564",
                fontFamily: FontFamilies.GTWalsheimBold,
              }}
            >
              {arrivalLocation}
            </Text>
          </View>
        </View>
        <View>
          <Text style={{ color: "#5E967E", fontSize: normalize(10) }}>
            Carbon emissions: {carbonEmissions}kg C
            <Text>
              O
              <Text
                style={{ fontSize: normalize(8), lineHeight: normalize(8) }}
              >
                2
              </Text>
            </Text>
          </Text>
          <TouchableOpacity
            style={{ flexDirection: "row", gap: 4 }}
            onPress={onViewDetails}
          >
            <Text
              style={{
                color: "#116F9A",
                fontSize: normalize(10),
                fontWeight: "bold",
              }}
            >
              View Details
            </Text>
            <Ionicons
              name="chevron-up"
              size={normalize(16)}
              color="#116F9A"
              style={{ justifyContent: "center" }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 3,
          backgroundColor: "#006564",
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
          paddingVertical: variant === "journey" ? 8 : 16,
          paddingHorizontal: 8,
          justifyContent: variant === "journey" ? "center" : "space-between",
          alignItems: "center",
          gap: variant === "journey" ? 4 : 8,
        }}
      >
        <Text style={{ color: "#E6E7E8", fontSize: normalize(8) }}>
          {transportClass}
        </Text>
        {variant === "ticket" && (
          <Text style={{ color: "#E6E7E8", fontSize: normalize(10) }}>
            From
          </Text>
        )}
        <Text style={{ color: "#fff", fontSize: normalize(12) }}>
          {currency}
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: normalize(14),
            fontWeight: "bold",
            textAlign: "center",
            paddingHorizontal: 4,
          }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          +{price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </Text>
        {variant === "ticket" && (
          <TouchableOpacity
            style={{
              borderRadius: 4,
              borderWidth: 0.75,
              borderColor: "#fff",
              paddingHorizontal: 16,
              paddingVertical: 8,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={onSelect}
          >
            <Text style={{ fontSize: normalize(10), color: "#fff" }}>
              Select
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
