import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

const PassengerModal = ({ isVisible, onClose, onConfirm }) => {
  const [cabinClass, setCabinClass] = useState("经济舱");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const handleConfirm = () => {
    onConfirm({ cabinClass, adults, children, infants });
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
            Select cabin and number of passengers
          </Text>
          <View style={{ marginBottom: 24 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  backgroundColor:
                    cabinClass === "Economy Class" ? "#006E6D" : "white",
                  borderRadius: 10,
                  marginRight: 10,
                }}
                onPress={() => setCabinClass("Economy Class")}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: cabinClass === "Economy Class" ? "white" : "#006E6D",
                  }}
                >
                  Economy Class
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  backgroundColor:
                    cabinClass === "Premium Economy Class"
                      ? "#006E6D"
                      : "white",
                  borderRadius: 10,
                }}
                onPress={() => setCabinClass("Premium Economy Class")}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color:
                      cabinClass === "Premium Economy Class"
                        ? "white"
                        : "#006E6D",
                  }}
                >
                  Premium Economy Class
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  backgroundColor:
                    cabinClass === "Business Class" ? "#006E6D" : "white",
                  borderRadius: 10,
                  marginRight: 10,
                }}
                onPress={() => setCabinClass("Business Class")}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color:
                      cabinClass === "Business Class" ? "white" : "#006E6D",
                  }}
                >
                  Business Class
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  backgroundColor:
                    cabinClass === "First Class" ? "#006E6D" : "white",
                  borderRadius: 10,
                }}
                onPress={() => setCabinClass("First Class")}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: cabinClass === "First Class" ? "white" : "#006E6D",
                  }}
                >
                  First Class
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 18 }}>Adult（>12 Years Old）</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#eee",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                onPress={() => setAdults(Math.max(adults - 1, 1))}
              >
                <Text style={{ fontSize: 18 }}>-</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 18, marginHorizontal: 10 }}>
                {adults}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#eee",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                onPress={() => setAdults(adults + 1)}
              >
                <Text style={{ fontSize: 18 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 18 }}>Babies（2-11 Years Old）</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#eee",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                onPress={() => setChildren(Math.max(children - 1, 0))}
              >
                <Text style={{ fontSize: 18 }}>-</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 18, marginHorizontal: 10 }}>
                {children}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#eee",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                onPress={() => setChildren(children + 1)}
              >
                <Text style={{ fontSize: 18 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 18 }}>Infants（>2 Years Old）</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#eee",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                onPress={() => setInfants(Math.max(infants - 1, 0))}
              >
                <Text style={{ fontSize: 18 }}>-</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 18, marginHorizontal: 10 }}>
                {infants}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#eee",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                onPress={() => setInfants(infants + 1)}
              >
                <Text style={{ fontSize: 18 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#006E6D",
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 5,
              }}
              onPress={handleConfirm}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PassengerModal;
