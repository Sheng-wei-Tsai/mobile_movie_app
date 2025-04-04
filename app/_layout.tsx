import React from "react";
import { Stack } from "expo-router";
import './globals.css';
import { TrendingProvider } from "@/services/TrendingContext";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />
      <TrendingProvider>
        <Stack>
        
          <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
          />
          <Stack.Screen
          name="movies/[id]"
          options={{ headerShown: false }}
        />
        </Stack>
      </TrendingProvider>
    </>
  );
}
