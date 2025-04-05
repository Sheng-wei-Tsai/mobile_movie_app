import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/services/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ title, children }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <View className="mb-6">
      <Text className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-dark-100'}`}>
        {title}
      </Text>
      {children}
    </View>
  );
};

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value?: string | boolean;
  onPress?: () => void;
  isSwitch?: boolean;
  onValueChange?: (value: boolean) => void;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  value,
  onPress,
  isSwitch,
  onValueChange,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center justify-between p-4 rounded-lg mb-2 ${
        isDark ? 'bg-dark-200' : 'bg-light-200'
      }`}
    >
      <View className="flex-row items-center">
        <Ionicons
          name={icon}
          size={24}
          color={isDark ? '#AB8BFF' : '#7B5CF5'}
          className="mr-3"
        />
        <Text className={`text-base ${isDark ? 'text-white' : 'text-dark-100'}`}>
          {title}
        </Text>
      </View>
      {isSwitch ? (
        <Switch
          value={value as boolean}
          onValueChange={onValueChange}
          trackColor={{ false: '#767577', true: '#AB8BFF' }}
          thumbColor={value ? '#7B5CF5' : '#f4f3f4'}
        />
      ) : (
        <View className="flex-row items-center">
          {value && (
            <Text className={`mr-2 ${isDark ? 'text-light-100' : 'text-light-300'}`}>
              {value}
            </Text>
          )}
          <Ionicons
            name="chevron-forward"
            size={20}
            color={isDark ? '#A8B5DB' : '#6C79A3'}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default function Profile() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [notifications, setNotifications] = React.useState(true);

  return (
    <View className={`flex-1 ${isDark ? 'bg-primary' : 'bg-primary-light'}`}>
      <View className="p-6">
        <View className={`items-center mb-8 p-6 rounded-xl ${
          isDark ? 'bg-dark-100' : 'bg-light-100'
        }`}>
          <View className={`w-20 h-20 rounded-full items-center justify-center mb-4 ${
            isDark ? 'bg-dark-200' : 'bg-light-200'
          }`}>
            <Ionicons
              name="person"
              size={40}
              color={isDark ? '#AB8BFF' : '#7B5CF5'}
            />
          </View>
          <Text className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-dark-100'}`}>
            John Doe
          </Text>
          <Text className={`${isDark ? 'text-light-100' : 'text-light-300'}`}>
            john.doe@example.com
          </Text>
        </View>

        <ProfileSection title="Account Settings">
          <SettingItem
            icon="mail-outline"
            title="Change Email"
            value="john.doe@example.com"
            onPress={() => console.log('Change email')}
          />
          <SettingItem
            icon="lock-closed-outline"
            title="Change Password"
            onPress={() => console.log('Change password')}
          />
        </ProfileSection>

        <ProfileSection title="Preferences">
          <SettingItem
            icon="notifications-outline"
            title="Notifications"
            isSwitch
            value={notifications}
            onValueChange={setNotifications}
          />
          <SettingItem
            icon="moon-outline"
            title="Dark Mode"
            isSwitch
            value={isDark}
            onValueChange={toggleTheme}
          />
        </ProfileSection>

        <ProfileSection title="App Info">
          <SettingItem
            icon="information-circle-outline"
            title="Version"
            value="1.0.0"
          />
          <SettingItem
            icon="document-text-outline"
            title="Terms of Service"
            onPress={() => console.log('Terms of Service')}
          />
          <SettingItem
            icon="shield-outline"
            title="Privacy Policy"
            onPress={() => console.log('Privacy Policy')}
          />
        </ProfileSection>

        <TouchableOpacity
          className={`mt-6 p-4 rounded-lg ${isDark ? 'bg-dark-200' : 'bg-light-200'}`}
          onPress={() => console.log('Logout')}
        >
          <Text className={`text-center font-bold ${isDark ? 'text-white' : 'text-dark-100'}`}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}