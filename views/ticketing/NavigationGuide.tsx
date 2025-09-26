import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { normalize } from "@/helpers/useScaling";
import { FontFamilies } from "@/helpers/FontFamiles";

type NavigationStep = {
  id: number;
  instruction: string;
  imageUrl: any;
  icon: keyof typeof Ionicons.glyphMap;
  estimatedTime: number;
  details: string;
};

type NavigationGuideProps = {
  steps: NavigationStep[];
};

export function NavigationGuide({ steps }: NavigationGuideProps) {
  const CARD_WIDTH = Dimensions.get("window").width - 40;
  const CARD_MARGIN = 20;
  const ITEM_SIZE = CARD_WIDTH + CARD_MARGIN;

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false}
        decelerationRate="fast"
        snapToInterval={ITEM_SIZE}
        contentContainerStyle={{ paddingRight: CARD_MARGIN }}
      >
        {steps.map((step, index) => (
          <View
            key={step.id}
            style={[
              styles.card,
              {
                width: CARD_WIDTH,
                marginLeft: index === 0 ? CARD_MARGIN : CARD_MARGIN / 2,
                marginRight: CARD_MARGIN / 2,
              },
            ]}
          >
            <View style={styles.header}>
              <View style={styles.stepIndicator}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
              </View>
              <View style={styles.instructionContainer}>
                <Text style={styles.instruction}>{step.instruction}</Text>
                <Text style={styles.estimatedTime}>
                  {step.estimatedTime} min
                </Text>
              </View>
            </View>
            <Image
              source={step.imageUrl}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.footer}>
              <Ionicons name={step.icon as any} size={24} color="#006564" />
              <Text style={styles.details}>{step.details}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    gap: 12,
  },
  stepIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#006564",
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumber: {
    color: "#fff",
    fontSize: normalize(16),
    fontFamily: FontFamilies.GTWalsheimBold,
  },
  instructionContainer: {
    flex: 1,
  },
  instruction: {
    fontSize: normalize(14),
    color: "#303436",
    fontFamily: FontFamilies.GTWalsheimBold,
  },
  estimatedTime: {
    fontSize: normalize(12),
    color: "#006564",
    marginTop: 4,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#f5f5f5",
  },
  footer: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  details: {
    flex: 1,
    fontSize: normalize(12),
    color: "#666",
  },
});
