import React, { useState, useEffect } from "react";
import {View, Text, Image, FlatList, ActivityIndicator} from 'react-native';

import {images} from "@/constants/images";
import {icons} from "@/constants/icons";

import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import { useTrending } from "@/services/TrendingContext";
import { useTheme } from "@/services/ThemeContext";


import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";


const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { refreshTrending } = useTrending();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const {
        data: movies = [],
        loading: moviesLoading,
        refetch: loadMovies,
        reset,
        error: moviesError} = useFetch(() => fetchMovies({
        query: searchQuery
    }), false);

    // Simple search effect
    useEffect(() => {
        const searchMovies = async () => {
            if (searchQuery.trim()) {
                try {
                    // Call loadMovies and wait for it to complete
                    const results = await loadMovies();
                    
                    // Only update search count if we have results
                    if (results && Array.isArray(results) && results.length > 0) {
                        try {
                            await updateSearchCount(searchQuery, results[0]);
                            
                            // Refresh trending movies after successful search count
                            if (refreshTrending) {
                                refreshTrending();
                            }
                        } catch (error) {
                            console.error("Error updating search count:", error);
                        }
                    }
                } catch (error) {
                    console.error("Error loading movies:", error);
                }
            } else {
                reset();
            }
        };

        // Add a small delay to prevent too many API calls
        const timeoutId = setTimeout(searchMovies, 500);
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // Ensure movies is always an array
    const safeMovies = Array.isArray(movies) ? movies : [];

    return (
        <View className={`flex-1 ${isDark ? 'bg-primary' : 'bg-primary-light'}`}>
            <Image source={images.bg} className="absolute w-full z-0"/>
            <View className="flex-1 px-5 pt-20">
                <SearchBar 
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search movies..."
                />
                
                {moviesLoading ? (
                    <ActivityIndicator
                        size="large"
                        color={isDark ? "#AB8BFF" : "#7B5CF5"}
                        className="mt-10 self-center"
                    />
                ) : moviesError ? (
                    <Text className={`text-center mt-10 ${isDark ? 'text-white' : 'text-dark-100'}`}>
                        Error loading movies. Please try again later.
                    </Text>
                ) : safeMovies.length === 0 && searchQuery ? (
                    <Text className={`text-center mt-10 ${isDark ? 'text-white' : 'text-dark-100'}`}>
                        No movies found for "{searchQuery}"
                    </Text>
                ) : (
                    <FlatList
                        data={safeMovies}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <MovieCard
                                id={item.id}
                                poster_path={item.poster_path}
                                title={item.title}
                                vote_average={item.vote_average}
                                release_date={item.release_date}
                            />
                        )}
                        className="mt-5"
                        showsVerticalScrollIndicator={false}
                        numColumns={3}
                        columnWrapperStyle={{
                            justifyContent: 'flex-start',
                            gap: 20,
                            paddingRight: 5,
                            marginBottom: 10,
                        }}
                    />
                )}
            </View>
        </View>
    );
};

export default Search;