import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { normalize } from "@/helpers/useScaling";
import { router } from "expo-router";
import * as Speech from "expo-speech";
import { FontAwesome } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";

// Remove external ID generators, use a simple counter instead
let messageIdCounter = 0;

const generateUniqueId = () => {
  messageIdCounter += 1;
  return messageIdCounter.toString();
};

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: generateUniqueId(),
      type: "bot",
      text: "Hi, I'm Vera - your virtual assistant. How may I help you today?",
    },
    {
      id: generateUniqueId(),
      type: "bot",
      text: "Simply share your desired destination, and I'll provide you with the most efficient routes, highlighting options with the lowest carbon emissions and the most affordable prices.",
    },
  ]);
  const [input, setInput] = useState("");
  const [destination, setDestination] = useState<string | null>(null);
  const [origin, setOrigin] = useState<string | null>(null);
  const [awaitingOrigin, setAwaitingOrigin] = useState(false);
  const [awaitingDestination, setAwaitingDestination] = useState(true);

  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [typingMessage, setTypingMessage] = useState("");
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    let dotInterval: NodeJS.Timeout;

    if (showTypingIndicator) {
      dotInterval = setInterval(() => {
        setDotCount((prev) => (prev % 3) + 1);
      }, 500);
    }

    return () => {
      if (dotInterval) {
        clearInterval(dotInterval);
      }
    };
  }, [showTypingIndicator]);

  const scrollViewRef = useRef<ScrollView>(null);

  const locationMap: { [key: string]: string } = {
    shenzhen: "SZX",
    szx: "SZX",
    fyg: "FYG",
    jakarta: "CGK",
  };

  const hardcodedResponses = [
    {
      exactQuestion: "Give me itinerary for a day trip in Shenzhen?",
      response:
        "Let me help you plan a perfect day in Shenzhen! 🌟\n• 9AM: Window of the World - iconic miniature landmarks\n• 12PM: OCT Harbour - waterfront dining\n• 2PM: OCT Loft - art galleries & cafes\n• 4:30PM: Dongmen Street - local shopping\n• 7PM: Dinner at Xiangmihu Seafood Street\n• 9PM: Civic Center light show\nWould you like directions or more details about any of these spots? Happy to help! 😊",
    },
    {
      exactQuestion: "are there any travel restrictions for entering China?",
      response:
        "Thank you for asking about China travel requirements. As of November 2024, here's what you'll need to enter China:\nA valid passport with at least 6 months validity\n2 blank passport pages\nTourist visa (required)\nMaximum RMB 20,000 for entry/exit\nWe recommend consulting a travel clinic for necessary vaccinations\nIs there anything else you'd like to know about traveling to China? I'm happy to help!",
    },
    {
      exactQuestion: "How to go from HKIA to the Macau Ferry Pier?",
      response:
        "Let me help you with directions from Hong Kong Airport to the Macau Ferry Pier! Here are your best options:\n🚌 A11 Bus:\nDirect route to Macau Ferry (5th stop)\nTravel time: ~45 minutes\nCost: HKD 40\n🚈 MTR:\nAirport Express to Hong Kong Station\nTransfer to Sheung Wan Station\nShort walk to ferry pier\nTravel time: ~50 minutes\n🚕 Taxi/Uber:\nDirect door-to-door service\nTravel time: 30-40 minutes\nCost: Around HKD 300-350\nWhich option would you like to know more about? I'm here to help with any questions! 😊",
    },
    {
      exactQuestion:
        "What's the weather forecast for Shenzhen on my arrival date?",
      response:
        "Let me check the weather for your Shenzhen arrival on November 16, 2024! 🌤️\nThe forecast shows:\n • Temperature: 20-25°C (68-77°F)\n • Conditions: Mild with occasional showers\n • Tip: Don't forget to pack a light rain jacket or umbrella!\nWould you like me to check the weather for any other days during your stay? I'm happy to help! 😊",
    },
    {
      exactQuestion:
        "Can you suggest some cheap eats options near the Shenzhen Futian Port?",
      response:
        "Here are some budget-friendly dining spots near Futian Port! 🍜\n• Shang Mian Jie - famous noodles & dumplings\n• Lao Cheng Gen - Sichuan cuisine with set meals\n• Huaqiang North Street Food - local snacks under ¥30\nMost meals at these places are under ¥50. Would you like specific directions to any of these spots? 😊",
    },
  ];

  const normalizeLocation = (input: string): string | null => {
    const lowerInput = input.toLowerCase();

    for (const key in locationMap) {
      if (lowerInput.includes(key)) {
        return locationMap[key];
      }
    }

    return null;
  };

  const handleSkyPierQuery = () => {
    const botResponse = {
      id: generateUniqueId(),
      type: "bot",
      text: "Sure! I can help you navigate to the Sky Pier.",
      cta: true,
      ctaText: "Navigate to Sky Pier",
      navigationPath: "/(tabs)/navigation",
    };
    simulateBotResponse(botResponse);
  };

  const API_KEY = "YOUR_API_KEY";
  const COOKIE = "YOUR_COOKIE";
  const API_ENDPOINT =
    "https://developers.cathaypacific.com/hackathon-apigw/hackathon-middleware/v1/vertex-ai/google-gemini";

  const matchHardcodedResponse = (userInput: string): string | null => {
    const exactMatch = hardcodedResponses.find(
      (item) => item.exactQuestion.toLowerCase() === userInput.toLowerCase()
    );
    return exactMatch ? exactMatch.response : null;
  };

  const simulateBotResponse = (messageObj: any) => {
    setIsBotTyping(true);
    setShowTypingIndicator(true);
    setTimeout(() => {
      setShowTypingIndicator(false);
      setTypingMessage("");
      let index = 0;
      const fullText = messageObj.text;
      typingIntervalRef.current = setInterval(() => {
        setTypingMessage(fullText.slice(0, index));
        index++;
        if (index > fullText.length) {
          clearInterval(typingIntervalRef.current!);
          setIsBotTyping(false);
          setTypingMessage("");
          setMessages((prevMessages) => [...prevMessages, messageObj]);
          if (messageObj.text && !isSpeaking) {
            Speech.speak(messageObj.text);
            setIsSpeaking(true);
          }
        }
      }, 25);
    }, 1000);
  };

  const sendMessage = async () => {
    if (input.trim().length === 0) return;

    const userInput = input.trim();
    const userMessage = {
      id: generateUniqueId(),
      type: "user",
      text: userInput,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    const standardizedLocation = normalizeLocation(userInput);
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes("sky pier")) {
      handleSkyPierQuery();
    } else if (awaitingDestination) {
      if (standardizedLocation) {
        setDestination(standardizedLocation);
        setAwaitingDestination(false);
        setAwaitingOrigin(true);

        const botResponse = {
          id: generateUniqueId(),
          type: "bot",
          text: `Great! You're heading to ${standardizedLocation}. Where are you departing from?`,
        };
        simulateBotResponse(botResponse);
      } else {
        const botResponse = {
          id: generateUniqueId(),
          type: "bot",
          text: `I didn't recognize that destination. Please enter a valid location.`,
        };
        simulateBotResponse(botResponse);
      }
    } else if (awaitingOrigin) {
      if (standardizedLocation) {
        setOrigin(standardizedLocation);
        setAwaitingOrigin(false);

        const botResponse = {
          id: generateUniqueId(),
          type: "bot",
          text: `I've found the most optimal route from ${standardizedLocation} to ${destination} with the least carbon emissions and the cheapest fare.`,
          cta: true,
          ctaText: "View Suggested Journey",
          navigationPath: "/(tabs)",
        };
        simulateBotResponse(botResponse);
      } else {
        const botResponse = {
          id: generateUniqueId(),
          type: "bot",
          text: `I didn't recognize that origin. Please enter a valid location.`,
        };
        simulateBotResponse(botResponse);
      }
    } else {
      const hardcodedResponse = matchHardcodedResponse(userInput);
      if (hardcodedResponse) {
        const botResponse = {
          id: generateUniqueId(),
          type: "bot",
          text: hardcodedResponse,
        };
        simulateBotResponse(botResponse);
      } else {
        setLoading(true);
        try {
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("apiKey", API_KEY);
          myHeaders.append("Cookie", COOKIE);

          const raw = JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: userInput,
                  },
                ],
              },
            ],
          });

          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow" as RequestRedirect,
          };

          const response = await fetch(API_ENDPOINT, requestOptions);

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          const botText = data.candidates[0].content.parts[0].text;

          setLoading(false);

          const botResponse = {
            id: generateUniqueId(),
            type: "bot",
            text: botText,
          };
          simulateBotResponse(botResponse);
        } catch (error: any) {
          console.error("Error:", error.message);
          setLoading(false);
          showMessage({
            message: "Error sending message",
            description: error.message,
            type: "danger",
            icon: "danger",
            duration: 5000,
          });
        }
      }
    }
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.text) {
        Speech.speak(lastMessage.text);
        setIsSpeaking(true);
      }
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages, isBotTyping, typingMessage, showTypingIndicator]);

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{
            paddingHorizontal: normalize(16),
            paddingBottom: normalize(12),
          }}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={{
                padding: 8,
                marginVertical: normalize(6),
                borderRadius: 8,
                maxWidth: "80%",
                alignSelf: message.type === "user" ? "flex-end" : "flex-start",
                backgroundColor:
                  message.type === "user" ? "#006564" : "#f0f0f0",
              }}
            >
              <Text
                style={{
                  fontSize: normalize(16),
                  color: message.type === "user" ? "#FFFFFF" : "#000000",
                }}
              >
                {message.text}
              </Text>
              {message.cta && (
                <TouchableOpacity
                  onPress={() => {
                    const path = (message as any).navigationPath || "/(tabs)";
                    router.push({
                      pathname: path,
                      params: { origin, destination },
                    });
                  }}
                  style={{
                    marginTop: 10,
                    backgroundColor: "#006564",
                    paddingVertical: normalize(10),
                    paddingHorizontal: normalize(20),
                    borderRadius: 20,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "600" }}>
                    {message.ctaText || "View Suggested Journey"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
          {(showTypingIndicator || isBotTyping) && (
            <View
              style={{
                padding: 8,
                marginVertical: normalize(6),
                borderRadius: 8,
                maxWidth: "80%",
                alignSelf: "flex-start",
                backgroundColor: "#f0f0f0",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {showTypingIndicator ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 8,
                  }}
                >
                  <Text style={{ fontSize: normalize(24), letterSpacing: 2 }}>
                    {"•".repeat(dotCount)}
                  </Text>
                  <Text
                    style={{
                      fontSize: normalize(24),
                      color: "#ccc",
                      letterSpacing: 2,
                    }}
                  >
                    {"•".repeat(3 - dotCount)}
                  </Text>
                </View>
              ) : (
                <Text
                  style={{
                    fontSize: normalize(16),
                    color: "#000",
                  }}
                >
                  {typingMessage}
                </Text>
              )}
            </View>
          )}
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            padding: normalize(12),
            paddingBottom: normalize(32),
            borderTopWidth: 1,
            borderTopColor: "#ddd",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={toggleSpeech}>
            {isSpeaking ? (
              <FontAwesome
                name="microphone-slash"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
            ) : (
              <FontAwesome
                name="microphone"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
            )}
          </TouchableOpacity>
          <TextInput
            style={{
              flex: 1,
              paddingVertical: normalize(8),
              paddingHorizontal: normalize(12),
              backgroundColor: "#f0f0f0",
              borderRadius: 20,
              fontSize: normalize(16),
            }}
            placeholder="Type your message here"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={{
              marginLeft: 8,
              alignItems: "center",
              backgroundColor: "#006564",
              paddingVertical: normalize(8),
              paddingHorizontal: normalize(12),
              borderRadius: 20,
            }}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={{ color: "#fff", fontWeight: "600" }}>SEND</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <FlashMessage position="top" />
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
