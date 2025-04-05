import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { icons } from "@/constants/icons";
import { useTheme } from '@/services/ThemeContext';

interface MovieCardProps {
  id: number;
  poster_path: string | null;
  title: string;
  vote_average: number;
  release_date: string | null;
}

const MovieCard = ({id, poster_path, title, vote_average, release_date}: MovieCardProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Format the release date if it exists
  const formattedDate = release_date 
    ? `${release_date.split('-')[1]}/${release_date.split('-')[0].substring(2)}` 
    : "";
  
  return (
    <Link href={`/movies/${id}`} asChild>
        <TouchableOpacity className="w-[30%]">
            <Image
                className="w-full h-52 rounded-lg"
                resizeMode="cover"
                source={{
                    uri: poster_path 
                      ? `https://image.tmdb.org/t/p/w500${poster_path}` 
                      : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
                }}
            />
            <Text className={`text-sm font-bold mt-2 ${isDark ? 'text-white' : 'text-dark-100'}`} numberOfLines={1}>
                {title || "Untitled"}
            </Text>
            <View className="flex-row items-center justify-start gap-x-1">
                <Image source={icons.star} className="size-4" />
                <Text className={`text-xs font-bold uppercase text-center ${isDark ? 'text-white' : 'text-dark-100'}`}>
                    {vote_average ? Math.round(vote_average / 2) : "N/A"}
                </Text>
            </View>
            <View className="flex-row items-center justify-between">
                <Text className={`text-xs font-medium mt-1 ${isDark ? 'text-light-300' : 'text-light-300'}`}>
                    {formattedDate}
                </Text>
            </View>
        </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
