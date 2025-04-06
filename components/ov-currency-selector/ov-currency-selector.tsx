import {
  ICurrency,
  IDestinationCurrencyType,
  TabType,
} from "@/types/currencies.type";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { OVTab } from "./ov-tab";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useDebounce } from "@/hooks/useDeBouncer";
import OVLoading from "../ov-loading";
import OVCurrencyList from "../ov-currency-list";

type CurrencySelectorProps = {
  onSelect: (currency: ICurrency) => void;
  selectedCurrency?: string;
  sourceCurrencies?: ICurrency[];
  destinationCurrency?: IDestinationCurrencyType | null;
};

const OVCurrencySelector: FC<CurrencySelectorProps> = ({
  onSelect,
  selectedCurrency,
  sourceCurrencies,
  destinationCurrency,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("crypto");

  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);

  const { fiatCurrencies, coinCurrencies } = useMemo(() => {
    const fiat: ICurrency[] = [];
    const coin: ICurrency[] = [];

    sourceCurrencies?.forEach((currency) => {
      if (currency.type === "fiat") {
        fiat.push(currency);
      } else if (currency.type === "coin") {
        coin.push(currency);
      }
    });

    return { fiatCurrencies: fiat, coinCurrencies: coin };
  }, [sourceCurrencies]);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const handleSearchChange = useCallback(
    (text: string) => {
      // setIsSearching(true);
      setSearchQuery(text);
    },
    [setSearchQuery, setIsSearching]
  );

  useEffect(() => {
    if (debouncedSearchQuery) {
      handleSearchChange(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, handleSearchChange]);

  useEffect(() => {
    handleSearchChange(debouncedSearchQuery);
  }, [debouncedSearchQuery, handleSearchChange]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const filteredCurrencies = useMemo(() => {
    const currencies = activeTab === "fiat" ? fiatCurrencies : coinCurrencies;

    if (!currencies || currencies.length === 0) return [];
    if (!searchQuery) return currencies;

    const query = searchQuery.toLowerCase().trim();

    // More comprehensive search that includes partial matches
    return currencies.filter((currency) => {
      const idMatch = currency.id.toLowerCase().includes(query);
      const nameMatch = currency.name.toLowerCase().includes(query);
      const symbolMatch = currency.symbol?.toLowerCase().includes(query);

      // If destinationCurrency is provided, filter out the source currency
      if (destinationCurrency && currency.id === destinationCurrency.id) {
        return false;
      }

      return idMatch || nameMatch || symbolMatch;
    });
  }, [
    searchQuery,
    activeTab,
    fiatCurrencies,
    coinCurrencies,
    destinationCurrency,
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <View style={styles.tabsContent}>
          <OVTab
            tabType={"crypto"}
            label={"Crypto"}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <OVTab
            tabType={"fiat"}
            label={"Fiat"}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchInputContainer,
            {
              backgroundColor: "#fff",
              borderBottomWidth: 1,
              borderBottomColor: "#000",
              borderWidth: 0,
              borderTopWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
            },
          ]}
        >
          <Ionicons
            name="search"
            size={20}
            color={theme.text + "80"}
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder={`Search ${activeTab}`}
            placeholderTextColor={theme.text + "80"}
            value={searchQuery}
            onChangeText={handleSearchChange}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Ionicons
                name="close-circle"
                size={20}
                color={theme.text + "80"}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {isSearching ? (
        <OVLoading />
      ) : (
        <OVCurrencyList
          onSelect={onSelect}
          filteredCurrencies={filteredCurrencies}
          searchQuery={searchQuery}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  tabsContainer: {
    marginBottom: 10,
    alignItems: "center",
  },
  tabsContent: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "center",
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
  },
  searchContainer: {
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    width: "100%",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    width: "100%",
  },
  clearButton: {
    padding: 4,
  },
});

export default OVCurrencySelector;
