import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { normalize } from "@/helpers/useScaling";
import { FontFamilies } from "@/helpers/FontFamiles";

const SuggestHeader = ({ name }: { name: string }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.greeting}>Hello {name}!</Text>
      <View style={styles.optimalRoute}>
        <Text style={styles.routeLabel}>Suggested journey</Text>
        <View style={styles.optimalBadge}>
          <Text style={styles.optimalText}>Optimal route</Text>
        </View>
      </View>
    </View>
  );
};

export default SuggestHeader;

const styles = StyleSheet.create({
  header: {
    padding: 20,
  },
  greeting: {
    fontSize: normalize(24),
    lineHeight: normalize(22),
    marginBottom: 8,
    fontWeight: "600",
    fontFamily: FontFamilies.GTWalsheimRegular,
  },
  optimalRoute: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  routeLabel: {
    fontSize: normalize(20),
    lineHeight: normalize(22),
    fontFamily: FontFamilies.GTWalsheimRegular,
    color: "#303436",
  },
  optimalBadge: {
    backgroundColor: "rgba(94, 150, 126, 0.25)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  optimalText: {
    color: "#006564",
    fontSize: normalize(16),
    paddingHorizontal: 4,
    fontFamily: FontFamilies.GTWalsheimRegular,
  },
})