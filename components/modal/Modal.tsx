import { FC } from "react";
import {
  Modal as NativeModal,
  Alert,
  StyleSheet,
  Text,
  Pressable,
  View,
} from "react-native";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
  backdrop?: boolean;
}

const Modal: FC<ModalProps> = ({ open, setOpen, children, backdrop }) => {
  return (
    <NativeModal
      animationType="fade"
      transparent
      visible={open}
      onRequestClose={() => {
        setOpen(!open);
      }}
    >
      <Pressable
        style={{
          backgroundColor: `${backdrop ? "rgba(0, 0, 0, 0.5)" : null}`,
          ...styles.centeredView,
        }}
        onPress={() => setOpen(false)}
      >
        <Pressable style={styles.modalView} onPress={() => setOpen(true)}>
          {children}
        </Pressable>
      </Pressable>
    </NativeModal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    overflow: "hidden",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default Modal;
