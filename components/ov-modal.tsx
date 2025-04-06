import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Modal as RNModal,
  TouchableWithoutFeedback,
  Platform,
  Text,
} from "react-native";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { BlurView } from "expo-blur";
import { OVText } from "./ov-text";

const { width, height } = Dimensions.get("window");

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const OVModal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  title,
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  console.log(visible, "visible");
  // Animation values
  const slideAnim = React.useRef(new Animated.Value(height)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Animate the modal sliding up and fading in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate the modal sliding down and fading out
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <RNModal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdropContainer}>
            {Platform.OS === "ios" ? (
              <BlurView intensity={50} style={styles.blurView} />
            ) : (
              <View
                style={[
                  styles.backdrop,
                  { backgroundColor: "rgba(0, 0, 0, 0.7)" },
                ]}
              />
            )}
          </View>
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.modal,
            {
              backgroundColor: theme.background,
              transform: [{ translateY: slideAnim }],
              opacity: fadeAnim,
              top: 50,
            },
          ]}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <OVText style={styles.closeButtonText}>✕</OVText>
              </TouchableOpacity>
            </View>

            {title && (
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
              </View>
            )}

            <View style={styles.body}>{children}</View>
          </View>
        </Animated.View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Align to top instead of center
    alignItems: "center",
  },
  backdropContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modal: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 50, // Position much closer to the header
    bottom: 0, // Extend to the bottom of the screen
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#FAFAFC",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: 700,
    textAlign: "center",
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  body: {
    flex: 1,
    width: "100%",
  },
});
