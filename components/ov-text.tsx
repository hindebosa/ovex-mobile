import { GlobalStyles } from "@/constants/Styles";
import React from "react";
import { Text, TextProps } from "react-native";

type FontWeight = "regular" | "medium" | "semibold" | "bold" | "black";

interface CustomTextProps extends TextProps {
  weight?: FontWeight;
}

export const OVText: React.FC<CustomTextProps> = ({
  style,
  weight = "regular",
  ...props
}) => {
  const getFontStyle = () => {
    switch (weight) {
      case "medium":
        return GlobalStyles.textMedium;
      case "bold":
        return GlobalStyles.textBold;
      case "black":
        return GlobalStyles.black; // Assuming black is similar to bold
      case "semibold":
        return GlobalStyles.textMedium; // Assuming semibold is similar to medium
      default:
        return GlobalStyles.text;
    }
  };

  return <Text style={[getFontStyle(), style]} {...props} />;
};
