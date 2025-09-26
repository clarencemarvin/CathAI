import {
  Image,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Feather from "@expo/vector-icons/Feather";
import { FontFamilies } from "@/helpers/FontFamiles";
import { normalize } from "@/helpers/useScaling";
import Button from "@/components/button";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";
import PromoDestinationCard from "@/components/PromoDestinationCard";
import { useState } from "react";
import VeraModal from "@/components/VeraModal";
import VeraSvg from "@/assets/svgs/vera-svg";
import { router } from "expo-router";
import SuggestHeader from "../(suggest)/SuggestHeader";
import JourneySegment from "../(suggest)/JourneySegment";
import SmartSuggestions from "../(suggest)/SmartSuggestions";
import { useLocalSearchParams } from "expo-router";
import { NavigationGuide } from "@/views/ticketing/NavigationGuide";

export default function HomeScreen() {
  const { origin, destination, success } = useLocalSearchParams();
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

  const handleProceed = () => {
    router.push("/ticket");
  };

  const [veraOpen, setVeraOpen] = useState(
    () => !(origin || destination || success)
  );
  const { height: screenHeight } = useWindowDimensions();

  function handleMenuPress(): void {
    console.log("notifications pressed");
  }

  function handleNotificationPress(): void {
    console.log("menu pressed");
  }

  function handleVeraPress(): void {
    router.push("/(vera)/ChatBot");
  }

  function handleVeraBot(): void {
    setVeraOpen(false);
    router.push("/(vera)/ChatBot");
  }

  return (
    <>
      <View
        style={{
          paddingTop: normalize(64),
          paddingHorizontal: normalize(20),
          paddingBottom: normalize(16),
          backgroundColor: "#F8F7F7",
        }}
      >
        <Image
          source={require("../../assets/images/cathay-logo.png")}
          style={{
            position: "absolute",
            top: normalize(64),
            alignSelf: "center",
          }}
        />
        <View
          style={{
            paddingTop: normalize(8),
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "flex-end",
            gap: normalize(24),
          }}
        >
          <TouchableOpacity onPress={handleNotificationPress}>
            <SimpleLineIcons name="bell" size={normalize(24)} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleMenuPress}>
            <Feather name="menu" size={normalize(24)} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={{
          backgroundColor: "#F8F7F7",
        }}
      >
        {origin && destination ? (
          <SafeAreaView style={{ backgroundColor: "#F8F7F7", flex: 1 }}>
            <ScrollView>
              <SuggestHeader name="Mr Howard" />

              <View style={styles.journeyCard}>
                <Text style={styles.date}>
                  Mon 11 Nov 2024 {""} | {""} CX 5624
                </Text>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <Text
                    style={{
                      fontFamily: FontFamilies.GTWalsheimBold,
                      color: "#006564",
                      fontSize: 16,
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
                <Text style={styles.transferTime}>
                  Transit:{" "}
                  <Text style={{ fontFamily: FontFamilies.GTWalsheimBold }}>
                    1h{" "}
                  </Text>
                  <Text>at </Text>
                  <Text style={{ fontFamily: FontFamilies.GTWalsheimBold }}>
                    HKG
                  </Text>
                </Text>
              </View>

              <TouchableOpacity
                style={styles.proceedButton}
                onPress={() => router.push("/(ticket)/checkout")}
              >
                <Text style={styles.proceedText}>
                  Proceed with this Journey
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.alternativeButton}
                onPress={handleProceed}
              >
                <Text style={styles.alternativeText}>Or</Text>
                <Text style={styles.alternativeText}>
                  View Alternative Routes{" "}
                  <Feather name="chevron-right" size={14} color="black" />
                </Text>
              </TouchableOpacity>
              <SmartSuggestions />
            </ScrollView>
          </SafeAreaView>
        ) : (
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              paddingTop: normalize(16),
              paddingHorizontal: normalize(20),
              paddingBottom: normalize(16),
              gap: normalize(8),
            }}
          >
            <Text
              style={{
                fontSize: normalize(24),
                lineHeight: normalize(22),
                fontFamily: FontFamilies.GTWalsheimRegular,
              }}
            >
              Hello Mr Howard!
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 4,
              }}
            >
              <Image
                source={require("../../assets/images/asia-miles.png")}
                style={{
                  width: normalize(13.33),
                  height: normalize(16),
                  alignSelf: "center",
                }}
              />
              <Text
                style={{
                  fontFamily: FontFamilies.GTWalsheimBold,
                  fontSize: normalize(16),
                  lineHeight: normalize(22),
                }}
              >
                156,188
              </Text>
              <Text
                style={{
                  fontFamily: FontFamilies.GTWalsheimUltraLight,
                  fontSize: normalize(16),
                  color: "#8E96A4",
                }}
              >
                |
              </Text>
              <Text
                style={{
                  fontFamily: FontFamilies.GTWalsheimRegular,
                  fontSize: normalize(14),
                  lineHeight: normalize(22),
                  color: "#444A54",
                }}
              >
                Status points
              </Text>
              <Text
                style={{
                  fontFamily: FontFamilies.GTWalsheimBold,
                  fontSize: normalize(16),
                  lineHeight: normalize(22),
                }}
              >
                532
              </Text>
            </View>
          </View>
        )}
        {success === "true" && (
          <View
            style={{
              width: "100%",
              height: "auto",
            }}
          >
            <TouchableOpacity
              style={styles.journeyCard}
              onPress={() => router.push("/(journey)/ManageBooking")}
            >
              <Text style={styles.date}>
                Mon 11 Nov 2024 {""} | {""} CX 5624
              </Text>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Text
                  style={{
                    fontFamily: FontFamilies.GTWalsheimBold,
                    color: "#006564",
                    fontSize: 16,
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
              <Text style={styles.transferTime}>
                Transit:{" "}
                <Text style={{ fontFamily: FontFamilies.GTWalsheimBold }}>
                  1h{" "}
                </Text>
                <Text>at </Text>
                <Text style={{ fontFamily: FontFamilies.GTWalsheimBold }}>
                  HKG
                </Text>
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: FontFamilies.GTWalsheimRegular,
                fontSize: normalize(24),
                paddingHorizontal: normalize(20),
                paddingVertical: normalize(20),
              }}
            >
              Navigation guide
            </Text>
            <View
              style={{
                paddingBottom: normalize(24),
              }}
            >
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
                    details:
                      "Automated People Mover will transport you to SkyPier",
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
          </View>
        )}
        <View
          style={{
            width: "100%",
            height: normalize(204),
          }}
        >
          <View
            style={{
              width: "100%",
              height: normalize(142),
            }}
          >
            <Image
              source={require("../../assets/images/cathay-wing-tip.jpg")}
              style={{
                width: "100%",
                height: "100%",
                aspectRatio: 550 / 170,
              }}
            />
            <View
              style={{
                position: "absolute",
                top: 76,
                flexDirection: "row",
                marginBottom: 8,
                marginHorizontal: normalize(20),
                gap: 16,
              }}
            >
              <Button
                title="Book a trip"
                theme="light"
                containerStyles={{
                  flex: 1,
                  borderRadius: 8,
                  borderColor: "rgba(0, 0, 0, 0.08)",
                  borderSize: 1,
                  shadowColor: "rgba(0, 0, 0, 0.05)",
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 1,
                  shadowRadius: 4,
                  elevation: 8,
                  height: screenHeight * 0.1,
                  padding: 12,
                }}
                onPress={() => router.push("/(ticket)/landingPage")}
              >
                <View
                  style={{
                    flexDirection: "column",
                    alignSelf: "center",
                    alignItems: "center",
                    gap: normalize(8),
                    flexWrap: "wrap",
                  }}
                >
                  <Ionicons name="airplane-sharp" size={24} color="#006564" />
                  <Text
                    style={{
                      fontFamily: FontFamilies.GTWalsheimRegular,
                      fontSize: normalize(16),
                      lineHeight: normalize(16),
                      maxWidth: "100%",
                    }}
                  >
                    Book a trip
                  </Text>
                </View>
              </Button>
              <Button
                title="Manage Booking"
                theme="light"
                containerStyles={{
                  flex: 1,
                  borderRadius: 8,
                  borderColor: "rgba(0, 0, 0, 0.08)",
                  borderSize: 1,
                  shadowColor: "rgba(0, 0, 0, 0.05)",
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 1,
                  shadowRadius: 4,
                  elevation: 8,
                  height: screenHeight * 0.1,
                  padding: 12,
                }}
                onPress={() => router.push("/(journey)/ManageBooking")}
              >
                <View
                  style={{
                    flexDirection: "column",
                    alignSelf: "center",
                    alignItems: "center",
                    gap: normalize(8),
                    flexWrap: "wrap",
                  }}
                >
                  <MaterialIcons
                    name="format-list-bulleted-add"
                    size={24}
                    color="#006564"
                  />
                  <Text
                    style={{
                      fontFamily: FontFamilies.GTWalsheimRegular,
                      fontSize: normalize(16),
                      lineHeight: normalize(16),
                      maxWidth: "100%",
                    }}
                  >
                    Manage booking
                  </Text>
                </View>
              </Button>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: normalize(460),
            backgroundColor: "#F0F4F1",
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              paddingVertical: normalize(32),
              paddingHorizontal: normalize(20),
              gap: normalize(12),
            }}
          >
            <Text
              style={{
                fontSize: normalize(22),
                fontFamily: FontFamilies.GTWalsheimRegular,
              }}
            >
              Our latest offers
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: normalize(4),
              }}
            >
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: FontFamilies.GTWalsheimRegular,
                }}
              >
                From:
              </Text>
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: FontFamilies.GTWalsheimBold,
                  color: "#006564",
                }}
              >
                Hong Kong
              </Text>
            </View>
          </View>
          <PromoDestinationCard
            data={[
              {
                destination: "Taipei",
                class: "Economy",
                price: "1,659",
                imageUrl: require("../../assets/images/singapore-picture.jpeg"),
              },
              {
                destination: "Kaohsiung",
                class: "Economy",
                price: "1,559",
                imageUrl: require("../../assets/images/singapore-picture.jpeg"),
              },
              {
                destination: "Singapore",
                class: "Economy",
                price: "2,323",
                imageUrl: require("../../assets/images/singapore-picture.jpeg"),
              },
              {
                destination: "Seoul",
                class: "Economy",
                price: "2,128",
                imageUrl: require("../../assets/images/singapore-picture.jpeg"),
              },
            ]}
            color="#F0F4F1"
          />
        </View>
        <View
          style={{
            width: "100%",
            height: normalize(460),
            backgroundColor: "#F8F7F7",
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              paddingVertical: normalize(32),
              paddingHorizontal: normalize(20),
              gap: normalize(12),
            }}
          >
            <Text
              style={{
                fontSize: normalize(22),
                fontFamily: FontFamilies.GTWalsheimRegular,
              }}
            >
              Prepared for you
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: normalize(4),
              }}
            >
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: FontFamilies.GTWalsheimRegular,
                }}
              >
                From:
              </Text>
              <Text
                style={{
                  fontSize: normalize(16),
                  fontFamily: FontFamilies.GTWalsheimBold,
                  color: "#006564",
                }}
              >
                Hong Kong
              </Text>
            </View>
          </View>
          <PromoDestinationCard
            data={[
              {
                destination: "Christchurch",
                class: "Economy",
                price: "8,771",
                imageUrl: require("../../assets/images/singapore-picture.jpeg"),
              },
              {
                destination: "Tokyo",
                class: "Economy",
                price: "2,920",
                imageUrl: require("../../assets/images/singapore-picture.jpeg"),
              },
              {
                destination: "Osaka",
                class: "Economy",
                price: "2,697",
                imageUrl: require("../../assets/images/singapore-picture.jpeg"),
              },
            ]}
            color="#F8F7F7"
          />
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          right: normalize(32),
          bottom: normalize(32),
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
      >
        <TouchableOpacity onPress={handleVeraPress}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <VeraSvg />
          </View>
        </TouchableOpacity>
      </View>
      <VeraModal
        first_name={"Howard"}
        open={veraOpen}
        setOpen={setVeraOpen}
        onPress={handleVeraBot}
      />
    </>
  );
}

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
  transferTime: {
    position: "absolute",
    bottom: 146,
    left: 130,
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
