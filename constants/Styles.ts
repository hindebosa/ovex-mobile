import { StyleSheet } from "react-native";
import { Fonts } from "./Fonts";

/**
 * Global styles for the app
 * These styles can be applied to components throughout the app
 */
export const GlobalStyles = StyleSheet.create({
  // Text styles
  text: {
    fontFamily: Fonts.primary.regular,
  },
  textMedium: {
    fontFamily: Fonts.primary.medium,
  },
  textBold: {
    fontFamily: Fonts.primary.bold,
  },
  // Fallback text style if primary font is not available
  textFallback: {
    fontFamily: Fonts.fallback.regular,
  },
  black: {
    fontFamily: Fonts.primary.black,
  },
  // Container styles
  container: {
    flex: 1,
  },
  // Add more global styles as needed
});
