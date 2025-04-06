import { ICurrency } from "@/types/currencies.type";
import React, { FC } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { OVCurrencyItem } from "./ov-currency-selector/ov-currency-item";
import { OVText } from "./ov-text";

type OVCurrencyListProps = {
  filteredCurrencies: ICurrency[];
  searchQuery: string;
  onSelect: (currency: ICurrency) => void;
};

const OVCurrencyList: FC<OVCurrencyListProps> = ({
  filteredCurrencies,
  searchQuery,
  onSelect,
}) => {
  return (
    <FlatList
      data={filteredCurrencies}
      renderItem={({ item }) => (
        <OVCurrencyItem item={item} onSelect={onSelect} />
      )}
      keyExtractor={(item) => item.id}
      style={styles.list}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={true}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <OVText style={styles.emptyText}>
            {searchQuery ? "No currencies found" : "No currencies available"}
          </OVText>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    height: "100%",
  },
  listContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default OVCurrencyList;
