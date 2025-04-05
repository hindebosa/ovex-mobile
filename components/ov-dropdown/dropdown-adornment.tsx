import { TouchableOpacity, View, StyleSheet } from "react-native";

export const DropdownAdornment = (
  adornment: React.ReactNode,
  onPress?: () => void,
  position: "left" | "right" = "left"
) => {
  if (!adornment) return null;

  const AdornmentWrapper = onPress ? TouchableOpacity : View;

  return (
    <AdornmentWrapper
      onPress={onPress}
      style={[
        styles.adornment,
        position === "left" ? styles.leftAdornment : styles.rightAdornment,
      ]}
    >
      {adornment}
    </AdornmentWrapper>
  );
};

const styles = StyleSheet.create({
  adornment: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  leftAdornment: {
    marginRight: 4,
  },
  rightAdornment: {
    marginLeft: 4,
  },
});
