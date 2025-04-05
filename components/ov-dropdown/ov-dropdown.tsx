import { Colors } from "@/constants/Colors";
import React from "react";
import {
  TextInputProps,
  TextStyle,
  useColorScheme,
  ViewStyle,
  StyleSheet,
  Platform,
  TextInput,
  View,
} from "react-native";
import { OVText } from "../ov-text";
import { DropdownAdornment } from "./dropdown-adornment";

interface DropdownProps extends TextInputProps {
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  onRightAdornmentPress?: () => void;
  onLeftAdornmentPress?: () => void;
}

export const OVDropdown: React.FC<DropdownProps> = ({
  leftAdornment,
  rightAdornment,
  label,
  error,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  onRightAdornmentPress,
  onLeftAdornmentPress,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <OVText style={styles.label}>{label}</OVText>}

      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: "#FFFFFF",
            borderColor: error ? "#FF3B30" : "transparent",
          },
          inputContainerStyle,
        ]}
      >
        {DropdownAdornment(leftAdornment, onLeftAdornmentPress, "left")}

        <TextInput
          style={[styles.input, { color: theme.text }, inputStyle]}
          placeholderTextColor={theme.icon}
          {...props}
        />

        {DropdownAdornment(rightAdornment, onRightAdornmentPress, "right")}
      </View>

      {error && <OVText style={styles.error}>{error}</OVText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0,
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 50,
    ...Platform.select({
      ios: {
        shadowColor: "#091E42",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    paddingVertical: 12,
    paddingLeft: 4,
  },
  error: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 4,
  },
});
