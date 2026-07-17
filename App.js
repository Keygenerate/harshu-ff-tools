import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import HomeScreen from './src/screens/HomeScreen';
import BanScreen from './src/screens/BanScreen';
import JwtScreen from './src/screens/JwtScreen';
import ToolsScreen from './src/screens/ToolsScreen';
import AdminScreen from './src/screens/AdminScreen';
import ResultScreen from './src/screens/ResultScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// API Configuration
export const DEFAULT_API_BASE = 'https://all-in-one-by-harshu-ff-tools.hars89031.workers.dev';

export const API_ENDPOINTS = {
  autoBan: '/ban',
  eatToJwt: '/eat-to-jwt',
  banOnly: '/ban-only',
  decodeJwt: '/decode-jwt',
  inspectToken: '/inspect-token',
  eatToAccess: '/eat-to-access',
  accessInfo: '/access-info',
  bio: '/bio',
  process: '/api/process',
  postEatToJwt: '/api/eat-to-jwt',
  postBan: '/api/ban',
  postInspect: '/api/inspect-token',
  postEatToAccess: '/eat-to-access',
  postAccessInfo: '/access-info',
  postBio: '/bio',
  config: '/config'
};

// Global API Base Context
export const ApiContext = React.createContext({
  apiBase: DEFAULT_API_BASE,
  setApiBase: () => {}
});

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Ban') {
            iconName = focused ? 'shield' : 'shield-outline';
          } else if (route.name === 'JWT') {
            iconName = focused ? 'key' : 'key-outline';
          } else if (route.name === 'Tools') {
            iconName = focused ? 'construct' : 'construct-outline';
          } else if (route.name === 'Admin') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00d4ff',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#0a0a0a',
          borderTopColor: '#1a1a1a',
          paddingBottom: 5,
          paddingTop: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Ban" component={BanScreen} />
      <Tab.Screen name="JWT" component={JwtScreen} />
      <Tab.Screen name="Tools" component={ToolsScreen} />
      <Tab.Screen name="Admin" component={AdminScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [apiBase, setApiBase] = useState(DEFAULT_API_BASE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApiBase();
  }, []);

  const loadApiBase = async () => {
    try {
      // First try to get from cloud config
      const response = await fetch(`${DEFAULT_API_BASE}/config`);
      if (response.ok) {
        const data = await response.json();
        if (data.api_base) {
          setApiBase(data.api_base);
          await AsyncStorage.setItem('api_base', data.api_base);
        }
      }

      // Fallback to local storage
      const saved = await AsyncStorage.getItem('api_base');
      if (saved) {
        setApiBase(saved);
      }
    } catch (e) {
      console.log('Config load error:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00d4ff" />
        <Text style={styles.loadingText}>HARSHU FF TOOLS</Text>
        <Text style={styles.loadingSub}>Loading...</Text>
      </View>
    );
  }

  return (
    <ApiContext.Provider value={{ apiBase, setApiBase }}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="Result" component={ResultScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </ApiContext.Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#00d4ff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  loadingSub: {
    color: '#666',
    fontSize: 16,
    marginTop: 10,
  },
});
