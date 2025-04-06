import { TabType } from "@/types/currencies.type";
import React, { FC, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { OVText } from "../ov-text";

type OVTabProps = {
  tabType: TabType;
  label: string;
  activeTab: TabType;
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>;
};
// Render tab button
export const OVTab: FC<OVTabProps> = ({
  tabType,
  label,
  activeTab,
  setActiveTab,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.tab,
        activeTab === tabType && { borderBottomColor: "#5589FF" },
      ]}
      onPress={() => setActiveTab(tabType)}
    >
      <OVText
        style={[styles.tabText, activeTab === tabType && { color: "#5589FF" }]}
        weight={activeTab === tabType ? "bold" : "regular"}
      >
        {label}
      </OVText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});
