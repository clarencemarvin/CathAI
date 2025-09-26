import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { normalize } from "@/helpers/useScaling";
import { FontFamilies } from "@/helpers/FontFamiles";

// Define your NavigationScreen component directly
export default function NavigationRoute() {
  return <NavigationScreen />;
}

// Type Definitions
interface NavigationStep {
  id: number;
  instruction: string;
  imageUrl: any;
  icon: IconNames;
  estimatedTime: number;
  details: string;
}

type IconNames =
  | "navigate-outline"
  | "boat-outline"
  | "card-outline"
  | "ticket-outline"
  | "train-outline"
  | "enter-outline";

interface NavigationScreenState {
  currentStep: number;
  totalTime: number;
  isLoading: boolean;
  selectedRoute: Route | null;
}

interface Route {
  id: string;
  name: string;
  from: string;
  to: string;
  steps: NavigationStep[];
}

// Route Data
const HKIA_TO_SKYPIER_ROUTE: Route = {
  id: "hkia-skypier",
  name: "HKIA to SkyPier",
  from: "HKIA",
  to: "SkyPier",
  steps: [
    {
      id: 1,
      instruction: "Follow signs to Mainland/Macau Ferries",
      imageUrl: require("@/assets/images/mainland-ferry-signs.png"),
      icon: "navigate-outline",
      estimatedTime: 5,
      details:
        "Look for clear signage directing to Mainland/Macau Ferries, not Transfer gate",
    },
    {
      id: 2,
      instruction: "Check in at TurboJET counter",
      imageUrl: require("@/assets/images/turbojet-counter.png"),
      icon: "boat-outline",
      estimatedTime: 10,
      details: "Located at Level 5, Transfer Area E2",
    },
    {
      id: 3,
      instruction: "Use Ferry Ticket Reader at boarding gate",
      imageUrl: require("@/assets/images/ferry-reader.png"),
      icon: "card-outline",
      estimatedTime: 2,
      details: "Alternative check-in method available at Level 5",
    },
    {
      id: 4,
      instruction: "Present SkyPier ferry ticket at APM entrance",
      imageUrl: require("@/assets/images/apm-entrance.png"),
      icon: "ticket-outline",
      estimatedTime: 3,
      details: "Have your ticket ready for verification",
    },
    {
      id: 5,
      instruction: "Take APM to SkyPier",
      imageUrl: require("@/assets/images/apm.png"),
      icon: "train-outline",
      estimatedTime: 5,
      details: "Automated People Mover will transport you to SkyPier",
    },
    {
      id: 6,
      instruction: "Follow signs to your boarding gate",
      imageUrl: require("@/assets/images/boarding-gate.png"),
      icon: "enter-outline",
      estimatedTime: 5,
      details:
        "Clear directional signs will guide you to your specific boarding gate",
    },
  ],
};

// Navigation Step Card Component
interface NavigationStepCardProps {
  step: NavigationStep;
  isActive: boolean;
}

const NavigationStepCard: React.FC<NavigationStepCardProps> = React.memo(
  ({ step, isActive }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
      <ThemedView style={[styles.stepCard, isActive && styles.activeStepCard]}>
        <View style={styles.stepHeader}>
          <Ionicons name={step.icon} size={24} color="#4A90E2" />
          <ThemedText type="defaultSemiBold">{`Step ${step.id}`}</ThemedText>
          <ThemedText>{`${step.estimatedTime} mins`}</ThemedText>
        </View>
        <View style={styles.imageContainer}>
          {!imageError ? (
            <Image
              source={step.imageUrl}
              style={styles.stepImage}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons
                name="image-outline"
                size={48}
                color={CATHAY_COLORS.darkGray}
              />
              <ThemedText style={styles.imagePlaceholderText}>
                Image not available
              </ThemedText>
            </View>
          )}
          {!imageLoaded && !imageError && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={CATHAY_COLORS.primary} />
            </View>
          )}
        </View>
        <ThemedText style={styles.instruction}>{step.instruction}</ThemedText>
        <ThemedText
          style={{
            fontFamily: FontFamilies.GTWalsheimRegular,
            fontSize: normalize(16),
            textAlign: "center",
          }}
        >
          {step.details}
        </ThemedText>
      </ThemedView>
    );
  }
);

// Navigation Progress Component
interface NavigationProgressProps {
  steps: number;
  currentStep: number;
  onStepPress: (step: number) => void;
}

const NavigationProgress: React.FC<NavigationProgressProps> = ({
  steps,
  currentStep,
  onStepPress,
}) => {
  return (
    <View style={styles.progressWrapper}>
      <View style={styles.progressContainer}>
        {Array.from({ length: steps }).map((_, index) => (
          <React.Fragment key={index}>
            <TouchableOpacity
              onPress={() => onStepPress(index)}
              style={[
                styles.progressDot,
                index <= currentStep ? styles.activeDot : styles.inactiveDot,
              ]}
            />
            {index < steps - 1 && (
              <View
                style={[
                  styles.progressLine,
                  index < currentStep ? styles.activeLine : styles.inactiveLine,
                ]}
              />
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

// Navigation Controls Component
interface NavigationControlsProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
}) => {
  return (
    <View style={styles.navigationControls}>
      <TouchableOpacity
        style={[styles.navButton, currentStep === 0 && styles.disabledButton]}
        onPress={onPrevious}
        disabled={currentStep === 0}
      >
        <ThemedText style={styles.buttonText}>Previous</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.navButton,
          currentStep === totalSteps - 1 && styles.disabledButton,
        ]}
        onPress={onNext}
        disabled={currentStep === totalSteps - 1}
      >
        <ThemedText style={styles.buttonText}>Next</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

// Error Boundary Component
class NavigationErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <ThemedView style={styles.errorContainer}>
          <ThemedText>Something went wrong with the navigation.</ThemedText>
          <TouchableOpacity
            onPress={() => this.setState({ hasError: false })}
            style={styles.retryButton}
          >
            <ThemedText>Retry</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      );
    }
    return this.props.children;
  }
}

// Update the NavigationScreen component
export const NavigationScreen: React.FC = () => {
  const [state, setState] = useState<NavigationScreenState>({
    currentStep: 0,
    totalTime: 0,
    isLoading: false,
    selectedRoute: HKIA_TO_SKYPIER_ROUTE,
  });

  useEffect(() => {
    if (state.selectedRoute) {
      const total = state.selectedRoute.steps.reduce(
        (acc, step) => acc + step.estimatedTime,
        0
      );
      setState((prev) => ({ ...prev, totalTime: total }));
    }
  }, [state.selectedRoute]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationErrorBoundary>
        <ThemedView style={styles.mainContainer}>
          <ScrollView style={styles.container}>
            {state.selectedRoute ? (
              <>
                <ThemedView style={styles.header}>
                  <ThemedText type="title">
                    {`${state.selectedRoute.from} → ${state.selectedRoute.to}`}
                  </ThemedText>
                  <ThemedText>{`Estimated time: ${state.totalTime} mins`}</ThemedText>
                </ThemedView>

                <NavigationProgress
                  steps={state.selectedRoute.steps.length}
                  currentStep={state.currentStep}
                  onStepPress={(step) =>
                    setState((prev) => ({ ...prev, currentStep: step }))
                  }
                />

                {/* Show only the current step */}
                <ThemedView style={styles.stepContainer}>
                  <NavigationStepCard
                    step={state.selectedRoute.steps[state.currentStep]}
                    isActive={true}
                  />
                </ThemedView>
              </>
            ) : (
              <ThemedView style={styles.noRouteContainer}>
                <ThemedText>
                  Please select a route to begin navigation
                </ThemedText>
              </ThemedView>
            )}
          </ScrollView>

          {state.selectedRoute && (
            <NavigationControls
              currentStep={state.currentStep}
              totalSteps={state.selectedRoute.steps.length}
              onPrevious={() =>
                setState((prev) => ({
                  ...prev,
                  currentStep: Math.max(prev.currentStep - 1, 0),
                }))
              }
              onNext={() =>
                setState((prev) => ({
                  ...prev,
                  currentStep: Math.min(
                    prev.currentStep + 1,
                    prev.selectedRoute!.steps.length - 1
                  ),
                }))
              }
            />
          )}
        </ThemedView>
      </NavigationErrorBoundary>
    </SafeAreaView>
  );
};

// Define your color palette
const CATHAY_COLORS = {
  primary: "#006564", // Cathay's signature teal/green
  secondary: "#8D1D41", // Burgundy red
  white: "#FFFFFF",
  lightGray: "#F4F4F4",
  darkGray: "#4D4D4F",
  border: "#E5E5E5",
  success: "#28a745",
  disabled: "#C5C5C5",
};

// Stylesheet
const styles = StyleSheet.create({
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CATHAY_COLORS.lightGray,
  },
  imagePlaceholderText: {
    marginTop: 8,
    color: CATHAY_COLORS.darkGray,
  },
  safeArea: {
    flex: 1,
    backgroundColor: CATHAY_COLORS.white,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: CATHAY_COLORS.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  stepContainer: {
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: normalize(20),
  },
  header: {
    marginBottom: normalize(24),
    alignItems: "center",
  },
  headerIcon: {
    color: CATHAY_COLORS.primary,
    alignSelf: "center",
    marginBottom: normalize(16),
  },
  // Step Card Styles
  stepCard: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: CATHAY_COLORS.white,
    shadowColor: CATHAY_COLORS.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: normalize(24),
    paddingHorizontal: normalize(24),
  },
  activeStepCard: {
    borderColor: CATHAY_COLORS.primary,
    borderWidth: 2,
    paddingHorizontal: normalize(24),
    paddingBottom: normalize(16),
  },
  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: normalize(16),
    borderBottomColor: CATHAY_COLORS.border,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 4 / 3,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: normalize(8),
    backgroundColor: CATHAY_COLORS.lightGray,
  },
  stepImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  instruction: {
    fontFamily: FontFamilies.GTWalsheimBold,
    fontSize: normalize(18),
    lineHeight: normalize(24),
    color: CATHAY_COLORS.darkGray,
    textAlign: "center",
    marginBottom: normalize(12),
    fontWeight: "600",
  },
  // Progress Styles
  progressWrapper: {
    width: "100%",
    paddingHorizontal: normalize(24),
    marginBottom: normalize(20),
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  progressDot: {
    width: normalize(12),
    height: normalize(12),
    borderRadius: 6,
    backgroundColor: CATHAY_COLORS.lightGray,
  },
  activeDot: {
    backgroundColor: CATHAY_COLORS.primary,
  },
  inactiveDot: {
    backgroundColor: CATHAY_COLORS.lightGray,
  },
  progressLine: {
    height: 2,
    flex: 1,
  },
  activeLine: {
    backgroundColor: CATHAY_COLORS.primary,
  },
  inactiveLine: {
    backgroundColor: CATHAY_COLORS.lightGray,
  },
  // Navigation Controls Styles
  navigationControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: normalize(16),
    paddingTop: normalize(16),
    backgroundColor: CATHAY_COLORS.white,
    borderTopWidth: 1,
    borderTopColor: CATHAY_COLORS.border,
  },
  navButton: {
    padding: normalize(16),
    backgroundColor: CATHAY_COLORS.primary,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: CATHAY_COLORS.disabled,
  },
  buttonText: {
    color: CATHAY_COLORS.white,
    fontSize: normalize(16),
    fontWeight: "bold",
  },
  // Loading and Error States
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: normalize(20),
  },
  noRouteContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: normalize(20),
  },
  retryButton: {
    marginTop: 16,
    padding: normalize(12),
    backgroundColor: CATHAY_COLORS.primary,
    borderRadius: 8,
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});
