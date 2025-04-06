import { FC } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

type AdornmentProps = {
  adornment: React.ReactNode;
  onPress?: () => void;
  position?: "left" | "right";
};
export const OVDropdownAdornment: FC<AdornmentProps> = ({
  adornment,
  onPress,
  position = "left",
}) => {
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
