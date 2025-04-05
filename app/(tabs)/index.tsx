import React, { useEffect } from 'react';
import { Image, ScrollView, Text, View, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api"
import { getTrendingMovies } from "@/services/appwrite";
import MovieCard from "@/components/MovieCard";
import TrendingCard from "@/components/TrendingCard";
import { useTrending } from "@/services/TrendingContext";
import { useTheme } from "@/services/ThemeContext";

export default function Index() {
  const router = useRouter();
  const { setRefreshTrending } = useTrending();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const {
    data: trendingMovies = [],
    loading: trendingLoading,
    error: trendingError,
    refetch: refetchTrending
  } = useFetch(getTrendingMovies);

  // Register the refresh function with the context
  useEffect(() => {
    setRefreshTrending(refetchTrending);
  }, [refetchTrending, setRefreshTrending]);

  const {
    data: movies = [],
    loading: moviesLoading,
    error: moviesError
  } = useFetch(() => fetchMovies({
    query: ''
  }));

  const handleSearchPress = () => {
    try {
      router.push("/search");
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-primary' : 'bg-primary-light'}`}>
      <Image source={images.bg} className="absolute w-full z-0"/>
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 10, minHeight: "100%"}}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>
        
        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color={isDark ? "#AB8BFF" : "#7B5CF5"}
            className="mt-10 self-center"
          />
        ) : moviesError || trendingError ? (
          <Text className={`text-center mt-10 ${isDark ? 'text-white' : 'text-dark-100'}`}>
            Error loading movies. Please try again later.
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={handleSearchPress}
              placeholder="Search for a movie"
            />
            
            {trendingMovies && trendingMovies.length > 0 && (
              <View className="mt-10">
                <Text className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-dark-100'}`}>
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4"/>}
                  className="mb-4 mt-3"
                  data={trendingMovies}
                  renderItem={({item, index}) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item, index) => `trending-${item.movie_id}-${index}`}
                />
              </View>
            )}

            {movies && movies.length > 0 && (
              <>
                <Text className={`text-lg font-bold mt-5 mb-3 ${isDark ? 'text-white' : 'text-dark-100'}`}>
                  Latest Movies
                </Text>
                <FlatList
                  className="mt-2 pb-32"
                  scrollEnabled={false}
                  data={movies}
                  renderItem={({item}) => (
                    <MovieCard
                      id={item.id}
                      poster_path={item.poster_path}
                      title={item.title}
                      vote_average={item.vote_average}
                      release_date={item.release_date}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent: 'flex-start',
                    gap: 20,
                    paddingRight: 5,
                    marginBottom: 10,
                  }}
                />
              </>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
