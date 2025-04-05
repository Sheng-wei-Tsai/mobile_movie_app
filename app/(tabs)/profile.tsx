import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Switch } from 'react-native';
import { router } from 'expo-router';
import { icons } from '@/constants/icons';

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
}

const ProfileSection = ({ title, children }: ProfileSectionProps) => {
  return (
    <View className="mb-6">
      <Text className="text-white font-bold text-lg mb-3">{title}</Text>
      <View className="bg-dark-100 rounded-lg p-4">
        {children}
      </View>
    </View>
  );
};

interface SettingItemProps {
  label: string;
  value?: string | boolean;
  onPress?: () => void;
  isSwitch?: boolean;
  onValueChange?: (value: boolean) => void;
}

const SettingItem = ({ label, value, onPress, isSwitch, onValueChange }: SettingItemProps) => {
  return (
    <View className="flex-row items-center justify-between py-3 border-b border-dark-200">
      <Text className="text-light-200 text-base">{label}</Text>
      {isSwitch ? (
        <Switch
          value={value as boolean}
          onValueChange={onValueChange}
          trackColor={{ false: '#2A2A2A', true: '#AB8BFF' }}
          thumbColor="#FFFFFF"
        />
      ) : (
        <TouchableOpacity onPress={onPress} className="flex-row items-center">
          <Text className="text-light-300 text-base mr-2">{value}</Text>
          <Image source={icons.arrow} className="size-4" tintColor="#A8B5DB" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const Profile = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('English');
  const [region, setRegion] = useState('United States');

  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Profile Header */}
        <View className="bg-dark-100 pt-12 pb-6 px-5">
          <View className="flex-row items-center">
            <Image
              source={{ uri: 'https://ui-avatars.com/api/?name=User&background=AB8BFF&color=fff' }}
              className="size-20 rounded-full"
            />
            <View className="ml-4">
              <Text className="text-white font-bold text-xl">User Name</Text>
              <Text className="text-light-300 text-base">user@example.com</Text>
              <TouchableOpacity className="mt-2 bg-accent rounded-full py-1 px-3">
                <Text className="text-white font-medium text-sm">Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="px-5 pt-6">
          {/* Account Settings */}
          <ProfileSection title="Account Settings">
            <SettingItem 
              label="Email" 
              value="user@example.com" 
              onPress={() => console.log('Change email')} 
            />
            <SettingItem 
              label="Password" 
              value="********" 
              onPress={() => console.log('Change password')} 
            />
            <SettingItem 
              label="Notifications" 
              isSwitch 
              value={notifications} 
              onValueChange={setNotifications} 
            />
            <SettingItem 
              label="Dark Mode" 
              isSwitch 
              value={darkMode} 
              onValueChange={setDarkMode} 
            />
          </ProfileSection>

          {/* Preferences */}
          <ProfileSection title="Preferences">
            <SettingItem 
              label="Language" 
              value={language} 
              onPress={() => console.log('Change language')} 
            />
            <SettingItem 
              label="Region" 
              value={region} 
              onPress={() => console.log('Change region')} 
            />
            <SettingItem 
              label="Content Rating" 
              value="PG-13" 
              onPress={() => console.log('Change content rating')} 
            />
          </ProfileSection>

          {/* App Info */}
          <ProfileSection title="App Info">
            <SettingItem 
              label="Version" 
              value="1.0.0" 
            />
            <SettingItem 
              label="Terms of Service" 
              onPress={() => console.log('View terms')} 
            />
            <SettingItem 
              label="Privacy Policy" 
              onPress={() => console.log('View privacy policy')} 
            />
          </ProfileSection>

          {/* Logout Button */}
          <TouchableOpacity 
            className="bg-red-500 rounded-lg py-3.5 mt-4 flex items-center"
            onPress={() => console.log('Logout')}
          >
            <Text className="text-white font-semibold text-base">Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;