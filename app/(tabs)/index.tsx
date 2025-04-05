import React, { useEffect, useCallback } from 'react';
import { Image, ScrollView,Text, View, ActivityIndicator, FlatList } from "react-native";
import {images} from "@/constants/images";
import {icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api"
import {getTrendingMovies} from "@/services/appwrite";
import MovieCard from "@/components/MovieCard";
import TrendingCard from "@/components/TrendingCard";
import { useTrending } from "@/services/TrendingContext";

export default function Index() {

  const router = useRouter();
  const { setRefreshTrending } = useTrending();

  const {
      data: trendingMovies,
      loading: trendingLoading,
      error: trendingError,
      refetch: refetchTrending
  } = useFetch(getTrendingMovies);

  // Register the refresh function with the context
  useEffect(() => {
    setRefreshTrending(refetchTrending);
  }, [refetchTrending, setRefreshTrending]);

  const {
      data: movies,
      loading: moviesLoading,
      error: moviesError} = useFetch(() => fetchMovies({
      query: ''
  }))


  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0"/>
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 10, minHeight: "100%"}}>

        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>
          {moviesLoading || trendingLoading ? (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="mt-10 self-center"
              />) : moviesError || trendingError ? (
                  <Text>Error: {moviesError?.message || trendingError?.message }</Text>
          ) : (
              <View className="flex-1 mt-5">
                  <SearchBar
                      onPress={() => router.push("/search")}
                      placeholder="Search for a movie"
                  />
                  {trendingMovies && (
                      <View className="mt-10">
                          <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>
                      </View>
                  )}
                  <>

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


                      <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
                      <FlatList
                            className="mt-2 pb-32"
                            scrollEnabled={false}
                            data={movies}
                            renderItem={({item}) => (
                                <MovieCard
                                    {...item}
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
              </View>

          )}

      </ScrollView>

    </View>
  );
}
