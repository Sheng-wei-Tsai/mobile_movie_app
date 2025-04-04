import React, { useState, useEffect, useRef } from "react";
import {View, Text, Image, FlatList, ActivityIndicator} from 'react-native';

import {images} from "@/constants/images";
import {icons} from "@/constants/icons";

import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import { useTrending } from "@/services/TrendingContext";


import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";


const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [finalSearchQuery, setFinalSearchQuery] = useState('');
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const searchCountedRef = useRef<boolean>(false);
    const { refreshTrending } = useTrending();

    const {
        data: movies = [],
        loading: moviesLoading,
        refetch: loadMovies,
        reset,
        error: moviesError} = useFetch(() => fetchMovies({
        query: finalSearchQuery
    }), false);

    // Debounced search effect for UI updates
    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            setFinalSearchQuery(searchQuery);
            searchCountedRef.current = false;
        }, 5000); // 5 seconds debounce

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchQuery]);

    // Effect to update search count only when final search query changes
    useEffect(() => {
        const updateSearch = async () => {
            if (finalSearchQuery.trim() && !searchCountedRef.current) {
                await loadMovies();

                // Call updateSearchCount only if there are results and we haven't counted this search yet
                if (movies?.length! > 0 && movies?.[0]) {
                    await updateSearchCount(finalSearchQuery, movies[0]);
                    searchCountedRef.current = true;
                    
                    // Refresh trending movies after successful search count
                    refreshTrending();
                }
            } else if (!finalSearchQuery.trim()) {
                reset();
            }
        };

        updateSearch();
    }, [finalSearchQuery, movies, refreshTrending]);

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover" />
            <FlatList
                data={movies}
                renderItem={({item}) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                className="px-5"
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'center',
                    gap: 16,
                    marginVertical: 16
                }}
                contentContainerStyle={{paddingBottom: 100}}
                ListHeaderComponent={
                <>
                    <View className="w-full flex-row justify-center mt-20 items-center">
                        <Image source={icons.logo} className="w-12 h-10" />
                    </View>
                    <View className="my-5">
                        <SearchBar
                            placeholder="Search for a movie..."
                            value={searchQuery}
                            onChangeText={(text: string) => setSearchQuery(text)}
                        />
                    </View>
                    {moviesLoading && (
                        <ActivityIndicator size="large" color="#0000ff" className="my-3" />
                    )}
                    {moviesError && (
                        <Text className="text-red-500 px-5 my-3"> Error: {moviesError.message} </Text>
                    )}
                    {!moviesLoading && !moviesError && finalSearchQuery.trim() && movies?.length > 0 && (
                        <Text className="text-xl text-white font-bold">
                            Search Results for {''}
                            <Text className="text-accent">{finalSearchQuery}</Text>
                        </Text>
                    )}
                </>
                }
                ListEmptyComponent={
                    !moviesLoading && !moviesError ? (
                        <View className="mt-10 px-5">
                            <Text className="text-center text-gray-500">
                                {finalSearchQuery.trim() ? 'No movies found' : 'Search for a movie'}
                            </Text>
                        </View>
                    ) : null
                }
            />
        </View>
    )
}

export default Search;