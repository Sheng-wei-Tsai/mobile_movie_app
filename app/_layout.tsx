import { Stack } from "expo-router";
import './globals.css';
import { TrendingProvider } from "@/services/TrendingContext";

export default function RootLayout() {
  return (
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
  );
}
