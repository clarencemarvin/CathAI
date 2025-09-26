import { FC } from "react";
import Modal from "./modal/Modal";
import { Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { normalize } from "@/helpers/useScaling";
import { FontFamilies } from "@/helpers/FontFamiles";


interface WelcomeModalProps {
  first_name: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onPress: (onPress: any) => void;
}
const WelcomeModal: FC<WelcomeModalProps> = ({ open, setOpen, first_name, onPress }) => {
  return (
    <Modal open={open} setOpen={setOpen} backdrop>
      <View style={{ height: "45%", width: normalize(353) }}>
        <Image
          source={require("../assets/images/Cathay-Pacific-Cabin-Crew.jpg")}
          style={{
            height: "100%",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            aspectRatio: 320 / 170,

          }}
        />
        <View style={{}}>
            <View style={{ paddingHorizontal: 20 }}>
              <Text
                style={{
                  fontSize: normalize(20),
                  fontFamily: FontFamilies.GTWalsheimBold,
                  paddingTop: normalize(20),
                  paddingBottom: normalize(12),
                }}
              >
                Hello {first_name}!
              </Text>
              <Text
                style={{
                  fontSize: normalize(14),
                  lineHeight: normalize(19.6),
                  fontFamily: FontFamilies.GTWalsheimRegular,
                  color: "#444A54",
                  paddingBottom: normalize(24),
                }}
              >
                I’m Vera, your personal guide to a seamless Cathay journey. Ready to explore? Let me make your first travel experience a breeze!
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#006564",
                  width: "100%",
                  borderRadius: 8,
                  marginBottom: normalize(12),
                }}
                onPress={onPress}
              >
                <Text
                  style={{
                    color: "white",
                    paddingVertical: normalize(12),
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: normalize(16),
                  }}
                >
                  Chat with Vera
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  width: "100%",
                  borderRadius: 8,
                }}
                onPress={() => setOpen(false)}
              >
                <Text
                  style={{
                    fontFamily: FontFamilies.GTWalsheimRegular,
                    fontSize: normalize(14),
                  }}
                >
                  Remind Me Later
                </Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    </Modal>
  );
};

export default WelcomeModal;
