import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as Speech from "expo-speech";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showStopIcon, setShowStopIcon] = useState(false);

  const API_KEY = "0Ws2MAmAseTl39JZLohswZZgWLCxpZ1K"; // Replace with your actual API key
  const COOKIE =
    "_abck=497F8B9FAD32E46E1EA9455520DB2D9F~-1~YAAQHZZUaDfCggKTAQAAvkkkBAzoa46wRy6pX5AKeBz1jKH0X+gqNXIdO0v/4BZQcUklSwWE/YYgPIbCY4dNpdG7d4TvYLz2qJRfozxXAJXmvcf4uISDKmK8eNebxkb3OvoZkYC95rsEO98NnDsKsv64w2Qusa/EWH8CpoPXBzGDRp70YaR+zr8VY5q7oQHicKQFzq4cApuJGR59Txk5owYbxWHZrUijBoIlMG82msFubotcpM2fssH+BXh6HlR0lxdIvV45cSLDzI63QcCO86r8AE5VdXfzRf9KxgYXdOaD3c7PBr5e08cJ8wt6U8ehVVgTQCPwaqAjqXKuUwNwQ4F5a3D0/8Nym545Rx2FYM9WRJnK5NjVmdY3mxZFseBHkE3i7P8I11hlhNiU9bbLxYEW7yQFrW00X29xCW15wFBd~-1~-1~-1; ak_bmsc=3308EBAAE345CF06F2915C33842A9BC2~000000000000000000000000000000~YAAQHZZUaDjCggKTAQAAvkkkBBmvYJHJwsCImLXZWmQWA/f3Y1okAFXEroCy3/nybk4RK3LElUFxahuhSk+2p9pCsvufdBqAbbWNmLtRT5QV6goUhH7gCQkHX7bNccmsmHIkYUdVM5uCUVhM7komT51XgKViYbNrAo1UB33Jkq6ASTX7ruleJjGpuDSipM4b7uOsW2OCP15EhDXHeB4T2yVAmAuUxNymvZGnjHRYSV6ycEDjnlSirBwU6frLwoi27J8NeeG3VeDgONRsOkroIJakaGPgram1c6ydiVYaXUMIOtXgRiryXG4xaURM4M0HTRydu+VRnbLOssRY9jePkisO8YDTKxMQz/SVKhbO4+JO/Q==; bm_sv=5210684E127923621A4202EA7DC77994~YAAQLBQgF8kaBQKTAQAAsEglBBm2Ezk/Qsp4CqdrRBo6eE6pcDxaZ0MKFSLAoFJLDG+x/6+p4cm4KQwGI0BPKrkZDIDMKbMQNLr9D6spol0r+jlqvoNCirDWlRmJjuQumOGUXuEa7AOHoRHcqmCaG2DDHJKjQS6sj0xsKeasR8eUV5NDvFkhUQGfli0sYPcstqEIBnprCS7LDTyMU56/VwlIoOAUMZGJbQeHMgO7pMW0OIwWO2bFDa80CRRuM1gnitNQv9uklQ==~1; bm_sz=8B1A0AF877B5236EA00A0282FB556097~YAAQHZZUaDnCggKTAQAAvkkkBBkkdeT403QLrdpQxy2p4lH8m4DTJg0rB5ytxTafhJdgKob4RtLjW7MJ/OmiBqVtgX8F6Gsj7L1KBHFrubYC3OoTDFA5TiBIgaFrZiT/sEvr0CJo24X/cusIThnh9AcWfa/UUy+BpxTbOlEhUZfS1I1FYxBO3VdRoSXDkJ74rvs+sy7vG/ZXOY1qvStZyd9ANyEKc81iPhF6HNU8h9O8yLdtcq0LzzXXtis96AbZfZqp2qY/8yiQIAe1CAF/8bzzkG91g1J4S8P8mYe65e6Oi4b3v/Wkb/mwikXtxSgllIEYTfcvwAh1hU4WPAWvUlYaCa4omdAZ6YqM9hPTD8HmYse3OQ==~3290420~4337975; 8bac6ca36dd7fb6e1a5df804509d965c=0c86393222528be065d396c1cb85b093; 91d1e5aa2d49f01a98ca619ad658207a=8a1d967d5717d68ece76a567f1b31bb0"; // Replace with your actual Cookie value
  const API_ENDPOINT =
    "https://developers.cathaypacific.com/hackathon-apigw/hackathon-middleware/v1/vertex-ai/google-gemini";

  useEffect(() => {
    const startChat = async () => {
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
                  text: "welcome to cathay hackathon!",
                },
              ],
            },
          ],
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        const response = await fetch(API_ENDPOINT, requestOptions);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const text = data.candidates[0].content.parts[0].text;
        console.log(text);
        showMessage({
          message: "Welcome to Gemini Chat 🤖",
          description: text,
          type: "info",
          icon: "info",
          duration: 2000,
        });
        setMessages([
          {
            text,
            user: false,
          },
        ]);
      } catch (error) {
        console.error("Error:", error.message);
        showMessage({
          message: "Error initializing chat",
          description: error.message,
          type: "danger",
          icon: "danger",
          duration: 5000,
        });
      }
    };
    // Function call
    startChat();
  }, []);

  const sendMessage = async () => {
    if (userInput.trim() === "") {
      return;
    }

    setLoading(true);
    const userMessage = { text: userInput, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

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
        redirect: "follow",
      };

      const response = await fetch(API_ENDPOINT, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const text = data.candidates[0].content.parts[0].text;
      setMessages((prevMessages) => [...prevMessages, { text, user: false }]);
      setLoading(false);
      setUserInput("");

      if (text && !isSpeaking) {
        Speech.speak(text);
        setIsSpeaking(true);
        setShowStopIcon(true);
      }
    } catch (error) {
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
  };

  const toggleSpeech = () => {
    console.log("isSpeaking", isSpeaking);
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

  const clearMessages = () => {
    setMessages([]);
    setIsSpeaking(false);
    setShowStopIcon(false);
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.user ? styles.userMessageContainer : styles.botMessageContainer,
      ]}
    >
      <Text style={[styles.messageText, item.user && styles.userMessage]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages.slice().reverse()} // Reverse messages for correct order
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.micIcon} onPress={toggleSpeech}>
            {isSpeaking ? (
              <FontAwesome
                name="microphone-slash"
                size={24}
                color="white"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            ) : (
              <FontAwesome
                name="microphone"
                size={24}
                color="white"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            )}
          </TouchableOpacity>
          <TextInput
            placeholder="Type a message"
            onChangeText={setUserInput}
            value={userInput}
            onSubmitEditing={sendMessage}
            style={styles.input}
            placeholderTextColor="#fff"
          />
          {showStopIcon && (
            <TouchableOpacity style={styles.stopIcon} onPress={clearMessages}>
              <Entypo name="controller-stop" size={24} color="white" />
            </TouchableOpacity>
          )}
          {loading && <ActivityIndicator size="small" color="#000" />}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffff", paddingTop: 50 },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  userMessageContainer: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  botMessageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#ECECEC",
  },
  messageText: { fontSize: 16 },
  userMessage: { color: "#000" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#131314",
    borderRadius: 10,
    height: 50,
    color: "white",
  },
  micIcon: {
    padding: 10,
    backgroundColor: "#131314",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  stopIcon: {
    padding: 10,
    backgroundColor: "#131314",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
});

export default GeminiChat;
