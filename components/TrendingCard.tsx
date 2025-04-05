import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useTheme } from '@/services/ThemeContext';
import { images } from "@/constants/images";

interface TrendingCardProps {
  movie: {
    movie_id: number;
    title: string;
    poster_url: string;
  };
  index: number;
}

const TrendingCard = ({movie: {movie_id, title, poster_url}, index}: TrendingCardProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <Link href={`/movies/${movie_id}`} asChild>
        <TouchableOpacity className="w-32 relative pl-5">
            <Image
                source={{uri: poster_url || 'https://placehold.co/600x400/1a1a1a/ffffff.png'}}
                className="w-32 h-48 rounded-lg"
                resizeMode="cover"
            />
            <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
                <MaskedView maskElement={
                    <Text className={`font-bold text-6xl ${isDark ? 'text-white' : 'text-dark-100'}`}>{index + 1}</Text>
                }>
                    <Image source={images.rankingGradient} className="size-14" resizeMode="cover" />
                </MaskedView>
            </View>
            <Text className={`text-sm font-bold mt-2 ${isDark ? 'text-light-200' : 'text-light-300'}`} numberOfLines={2}>
                {title || "Untitled"}
            </Text>
        </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
