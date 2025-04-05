import React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { icons } from "@/constants/icons";
import { useTheme } from '@/services/ThemeContext';

interface Props {
    placeholder: string;
    onPress?: () => void;
    value?: string;
    onChangeText?: (text: string) => void;
}

const SearchBar = ({placeholder, onPress, value, onChangeText}: Props) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <TouchableOpacity 
            onPress={onPress}
            activeOpacity={1}
            className={`flex-row items-center rounded-full px-5 py-4 ${
                isDark ? 'bg-dark-200' : 'bg-light-200'
            }`}
        >
            <Image 
                source={icons.search} 
                className="size-5" 
                resizeMode="contain" 
                tintColor={isDark ? "#ab8bff" : "#7B5CF5"}
            />
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor={isDark ? "#a8b5db" : "#6C79A3"}
                className={`flex-1 ml-2 ${isDark ? 'text-white' : 'text-dark-100'}`}
                pointerEvents={onPress ? "none" : "auto"}
            />
        </TouchableOpacity>
    );
};

export default SearchBar;
