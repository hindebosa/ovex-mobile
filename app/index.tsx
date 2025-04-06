import { HomeProvider } from "@/providers/home.provider";
import HomeView from "@/sections/ov-home-screen";

import React from "react";

export default function HomeScreen() {
  return (
    <HomeProvider>
      <HomeView />
    </HomeProvider>
  );
}
