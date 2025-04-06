import { TouchableOpacity, View, StyleSheet, Image } from "react-native";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { ICurrency, IDestinationCurrencyType } from "@/types/currencies.type";
import { OVText } from "../ov-text";

interface ICurrencyItemProps {
  item: ICurrency | IDestinationCurrencyType;
  onSelect?: (currency: ICurrency) => void;
  isSelected?: boolean;
}

export const OVCurrencyItem: React.FC<ICurrencyItemProps> = ({
  item,
  onSelect,
  isSelected = false,
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  return (
    <TouchableOpacity
      style={[
        styles.currencyItem,
        isSelected && { backgroundColor: theme.tint + "20" },
      ]}
      onPress={() => onSelect && onSelect(item as ICurrency)}
    >
      <View style={styles.currencyIconContainer}>
        {item.icon_url ? (
          <Image
            source={{ uri: item.icon_url }}
            style={styles.currencyIcon}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.currencySymbolContainer}>
            <OVText style={styles.currencySymbol}>{item.symbol}</OVText>
          </View>
        )}
      </View>
      <View style={styles.currencyInfo}>
        <View style={styles.currencyNameContainer}>
          <OVText style={styles.currencyId}>{item.id.toUpperCase()}</OVText>
          <OVText style={styles.currencyName}> {item.name}</OVText>
        </View>
      </View>

      {isSelected ? (
        <View
          style={[styles.selectedIndicator, { backgroundColor: theme.tint }]}
        >
          <OVText style={styles.selectedIndicatorText}>✓</OVText>
        </View>
      ) : (
        <Ionicons name="chevron-forward" size={20} color={theme.text} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  currencyItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#A6BBE229",
    backgroundColor: "#FFFFFF",
  },
  currencyIconContainer: {
    width: 20,
    height: 20,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  currencyIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  currencySymbolContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  currencySymbol: {
    fontSize: 12,
    fontWeight: "bold",
  },
  currencyInfo: {
    flex: 1,
  },
  currencyNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  currencyId: {
    fontSize: 16,
    color: "#303038",
  },
  currencyName: {
    fontSize: 13,
    color: "#8E8D99",
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedIndicatorText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
