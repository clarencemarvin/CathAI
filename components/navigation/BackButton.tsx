import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HeaderBackButtonProps } from "@react-navigation/native-stack";
import Button from "@/components/button";
import Modal from "@/components/modal/Modal";
import { useRouter } from "expo-router";
import { normalize } from "../../helpers/useScaling";

const { width } = Dimensions.get("window");

interface AlertModalProps {
  visible: boolean;
  setModalVisible: (visible: boolean) => void;
  onDiscard: () => void;
  loading: boolean;
  copyWriting: string;
}

const AlertModal = ({
  visible,
  setModalVisible,
  onDiscard,
  loading,
  copyWriting,
}: AlertModalProps) => {

  return (
    <Modal open={visible} setOpen={setModalVisible} backdrop={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{copyWriting}</Text>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              disabled={loading}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonTextCancel}>Cancel</Text>
            </Button>
            <View style={styles.buttonSeparator} />
            <Button
              style={styles.button}
              onPress={onDiscard}
              disabled={loading}
            >
              <Text style={styles.buttonTextDiscard}>Discard</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const BackButton: React.FC<HeaderBackButtonProps> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleOnBackButtonPress = () => {
    if (props.isLogout) {
      setModalVisible(true);
    } else if (props.customNavigationAction) {
      props.customNavigationAction();
    } else {
      router.back();
    }
  };

  return (
    <>
      <Button style={styles.backButton} onPress={handleOnBackButtonPress}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            size={24}
            color={props.iconColor || "#000000"}
          />
        </View>
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    width: width * 0.7,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: normalize(13),
    color: "#000",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "white",
  },
  buttonSeparator: {
    width: 1,
    backgroundColor: "#E5E5E5",
  },
  buttonTextCancel: {
    color: "#007AFF",
    fontSize: normalize(17),
    fontWeight: "400",
  },
  buttonTextDiscard: {
    color: "#FF3B30",
    fontSize: normalize(17),
    fontWeight: "600",
  },
});

export default BackButton;
