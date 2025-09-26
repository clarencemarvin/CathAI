import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { FontFamilies } from "@/helpers/FontFamiles";
import { normalize } from "@/helpers/useScaling";

interface JourneySegmentProps {
  from: {
    code: string;
    name: string;
    terminal: string;
  };
  to: {
    code: string;
    name: string;
    terminal: string;
  };
  departureTime: string;
  arrivalTime: string;
  transportType: "plane" | "ferry";
  carbonEmissions: number;
}

const JourneySegment = (props: JourneySegmentProps) => {
  return (
    <View style={styles.segment}>
      <View style={styles.timeColumn1}>
        <Text style={styles.code}>{props.from.code}</Text>
        <Text style={styles.time}>{props.departureTime}</Text>
        <Text style={styles.name1}>{props.from.name}</Text>
        <Text style={styles.terminal}>{props.from.terminal}</Text>
      </View>

      <View style={styles.connectionLine}>
        {props.transportType === "plane" ? (
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontFamily: FontFamilies.GTWalsheimRegular,
                fontSize: 12,
              }}
            >
              5h 15m
            </Text>
            <Image source={require("@/assets/images/plane-journey.png")} />
          </View>
        ) : (
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontFamily: FontFamilies.GTWalsheimRegular,
                fontSize: 12,
              }}
            >
              50m
            </Text>
            <Image source={require("@/assets/images/ferry-journey.png")} />
          </View>
        )}
      </View>

      <View style={styles.timeColumn2}>
        <Text style={styles.code}>{props.to.code}</Text>
        <Text style={styles.time}>{props.arrivalTime}</Text>
        <Text style={styles.name2}>{props.to.name}</Text>
        <Text style={styles.terminal}>{props.to.terminal}</Text>
      </View>

      <Text style={styles.emissions}>
        Carbon emissions: {props.carbonEmissions}kg CO₂
      </Text>
    </View>
  );
};

export default JourneySegment;

const styles = StyleSheet.create({
  journeyCard: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  date: {
    color: "#444A54",
    fontSize: 14,
  },
  segment: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 14,
    gap: 16,
  },
  timeColumn1: {
    flex: 1,
  },
  timeColumn2: {
    flex: 1,
    alignItems: "flex-end",
  },
  time: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: FontFamilies.GTWalsheimRegular,
  },
  code: {
    fontSize: 14,
    color: "#006564",
    fontFamily: FontFamilies.GTWalsheimBold,
  },
  name1: {
    fontSize: 12,
    color: "#444A54",
    fontFamily: FontFamilies.GTWalsheimRegular,
  },
  name2: {
    fontSize: 12,
    color: "#444A54",
    fontFamily: FontFamilies.GTWalsheimRegular,
    textAlign: "right",
  },
  terminal: {
    fontSize: 12,
    color: "#999",
    marginBottom: 20,
    fontFamily: FontFamilies.GTWalsheimRegular,
  },
  connectionLine: {
    width: 150,
    alignItems: "center",
    flexDirection: "column",
    marginBottom: 20,
    fontFamily: FontFamilies.GTWalsheimRegular,
  },
  emissions: {
    position: "absolute",
    bottom: normalize(-2),
    left: 0,
    fontSize: normalize(12),
    color: "#5E967E",
    fontFamily: FontFamilies.GTWalsheimRegular,
  },
});