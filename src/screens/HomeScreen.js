import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import ToolCard from '../components/ToolCard';
import { ApiContext } from '../../App';

export default function HomeScreen({ navigation }) {
  const { apiBase } = useContext(ApiContext);

  const tools = [
    {
      title: 'Auto JWT + Ban',
      description: 'Convert EAT token to JWT and auto ban',
      icon: 'flash',
      color: '#ff4757',
      screen: 'Ban',
    },
    {
      title: 'EAT to JWT',
      description: 'Convert EAT token to JWT format',
      icon: 'swap-horizontal',
      color: '#2ed573',
      screen: 'JWT',
    },
    {
      title: 'Ban Only',
      description: 'Ban account using JWT directly',
      icon: 'ban',
      color: '#ff6b81',
      screen: 'Ban',
    },
    {
      title: 'Decode JWT',
      description: 'Decode and view JWT contents',
      icon: 'code-slash',
      color: '#ffa502',
      screen: 'JWT',
    },
    {
      title: 'Inspect Token',
      description: 'Get detailed token information',
      icon: 'search',
      color: '#1e90ff',
      screen: 'Tools',
    },
    {
      title: 'EAT to Access',
      description: 'Convert EAT to Access Token',
      icon: 'key',
      color: '#a55eea',
      screen: 'Tools',
    },
    {
      title: 'Access Info',
      description: 'Get Access Token details',
      icon: 'information-circle',
      color: '#26de81',
      screen: 'Tools',
    },
    {
      title: 'Bio Update',
      description: 'Update Free Fire bio',
      icon: 'create',
      color: '#fd79a8',
      screen: 'Tools',
    },
  ];

  return (
    <View style={styles.container}>
      <Header title="HARSHU FF TOOLS" subtitle="All-in-One Free Fire Toolkit" />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <LinearGradient
          colors={['#1a1a2e', '#16213e']}
          style={styles.hero}
        >
          <Text style={styles.heroTitle}>Welcome to FF Tools</Text>
          <Text style={styles.heroText}>
            Professional Free Fire toolkit for token conversion, banning, and account management.
          </Text>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>API Connected</Text>
          </View>
          <Text style={styles.apiUrl}>{apiBase}</Text>
        </LinearGradient>

        {/* Quick Tools */}
        <Text style={styles.sectionTitle}>Quick Tools</Text>
        {tools.map((tool, index) => (
          <ToolCard
            key={index}
            title={tool.title}
            description={tool.description}
            icon={tool.icon}
            color={tool.color}
            onPress={() => navigation.navigate(tool.screen)}
          />
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with ❤️ by HARSHU</Text>
          <Text style={styles.footerVersion}>v4.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 15,
  },
  hero: {
    borderRadius: 16,
    padding: 20,
    marginTop: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  heroText: {
    color: '#888',
    fontSize: 13,
    marginTop: 8,
    lineHeight: 20,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00d4ff',
    marginRight: 8,
  },
  statusText: {
    color: '#00d4ff',
    fontSize: 12,
    fontWeight: '600',
  },
  apiUrl: {
    color: '#666',
    fontSize: 10,
    marginTop: 5,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  footerText: {
    color: '#666',
    fontSize: 12,
  },
  footerVersion: {
    color: '#444',
    fontSize: 11,
    marginTop: 5,
  },
});
