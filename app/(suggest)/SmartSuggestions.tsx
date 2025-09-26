import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { normalize } from "@/helpers/useScaling";
import { FontFamilies } from "@/helpers/FontFamiles";

const SmartSuggestions = () => {
  return (
    <View style={styles.suggestions}>
      <Text style={styles.suggestionsTitle}>Smart suggestions</Text>
      <View style={styles.suggestionBox}>
        <View style={styles.weatherAlert}>
          <Ionicons name="rainy" size={24} color="#006064" />
          <Text style={styles.weatherText}>
            <Text
              style={{
                fontFamily: FontFamilies.GTWalsheimBold,
                color: "#006564",
              }}
            >
              Heavy rain{" "}
            </Text>
            <Text>expected at arrival in </Text>
            <Text
              style={{
                fontFamily: FontFamilies.GTWalsheimBold,
                color: "#006564",
              }}
            >
              Hong Kong
            </Text>
            <Text> and </Text>
            <Text
              style={{
                fontFamily: FontFamilies.GTWalsheimBold,
                color: "#006564",
              }}
            >
              Shenzhen
            </Text>
            <Text>.</Text>
          </Text>
        </View>
        <Text style={styles.umbrellaText}>
          Forgot to bring an umbrella? Protect yourself from getting wet during
          your journey.
        </Text>
        <TouchableOpacity style={styles.transferButton}>
          <Text style={styles.proceedText}>Book Premium Transfer Service</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.helpText}>Need help with your trip?</Text>
    </View>
  );
};

export default SmartSuggestions;

const styles = StyleSheet.create({
  transferTime: {
    position: "absolute",
    bottom: 146,
    left: 120,
    fontSize: 12,
    color: "#303436",
    fontFamily: FontFamilies.GTWalsheimRegular,
    textAlign: "center",
  },
  proceedButton: {
    backgroundColor: "#367D79",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
    marginHorizontal: 16,
  },
  proceedText: {
    color: "white",
    fontSize: normalize(16),
    fontWeight: "600",
    fontFamily: FontFamilies.GTWalsheimBold,
  },
  alternativeButton: {
    padding: 16,
    alignItems: "center",
  },
  alternativeText: {
    color: "#444A54",
    fontSize: normalize(16),
    paddingVertical: 4,
    fontFamily: FontFamilies.GTWalsheimRegular,
  },
  suggestions: {
    padding: 20,
  },
  suggestionsTitle: {
    fontSize: normalize(20),
    fontWeight: "600",
    color: "#303436",
    marginBottom: 16,
    fontFamily: FontFamilies.GTWalsheimRegular,
  },
  suggestionBox: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  weatherAlert: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  weatherText: {
    fontSize: normalize(14),
    color: "#303436",
    fontFamily: FontFamilies.GTWalsheimRegular,
  },
  umbrellaText: {
    fontSize: normalize(12),
    marginTop: 12,
    paddingHorizontal: 2,
    color: "#303436",
    fontFamily: FontFamilies.GTWalsheimLight,
  },
  transferButton: {
    backgroundColor: "#367D79",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  transferText: {
    color: "#006064",
    fontSize: 16,
  },
  helpText: {
    fontSize: normalize(14),
    color: "#0F7490",
    marginTop: 14,
    textAlign: "center",
    fontFamily: FontFamilies.GTWalsheimRegular,
  },
});