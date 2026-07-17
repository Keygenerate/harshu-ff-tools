import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import InputField from '../components/InputField';
import ActionButton from '../components/ActionButton';
import ResultViewer from '../components/ResultViewer';
import FFApi from '../utils/api';
import { ApiContext, DEFAULT_API_BASE } from '../../App';
import Toast from 'react-native-toast-message';

const ADMIN_PASSWORD = 'harshu123';

export default function AdminScreen({ navigation }) {
  const { apiBase, setApiBase } = useContext(ApiContext);
  const api = new FFApi(DEFAULT_API_BASE);

  const [adminPassword, setAdminPassword] = useState('');
  const [newApiBase, setNewApiBase] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const verifyPassword = () => {
    if (adminPassword !== ADMIN_PASSWORD) {
      Toast.show({ type: 'error', text1: 'Access Denied', text2: 'Wrong admin password!' });
      return false;
    }
    return true;
  };

  const handleSetConfig = async () => {
    if (!verifyPassword()) return;
    if (!newApiBase.trim()) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Enter API Base URL' });
      return;
    }
    setLoading(true);
    try {
      const res = await api.setConfig(newApiBase, ADMIN_PASSWORD);
      if (res.success) {
        setApiBase(newApiBase);
        await AsyncStorage.setItem('api_base', newApiBase);
        Toast.show({ type: 'success', text1: 'Success', text2: 'API Base updated!' });
      } else {
        Toast.show({ type: 'error', text1: 'Error', text2: res.data?.error || 'Failed' });
      }
      setResult(res);
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Error', text2: e.message });
    }
    setLoading(false);
  };

  const handleGetConfig = async () => {
    setLoading(true);
    try {
      const res = await api.getConfig();
      setResult(res);
      if (res.success && res.data.api_base) {
        setApiBase(res.data.api_base);
        await AsyncStorage.setItem('api_base', res.data.api_base);
      }
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Error', text2: e.message });
    }
    setLoading(false);
  };

  const handleDeleteConfig = async () => {
    if (!verifyPassword()) return;
    Alert.alert(
      'Confirm Delete',
      'Clear API config from cloud?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              const res = await api.deleteConfig(ADMIN_PASSWORD);
              if (res.success) {
                setApiBase(DEFAULT_API_BASE);
                await AsyncStorage.setItem('api_base', DEFAULT_API_BASE);
                Toast.show({ type: 'success', text1: 'Success', text2: 'Config cleared!' });
              }
              setResult(res);
            } catch (e) {
              Toast.show({ type: 'error', text1: 'Error', text2: e.message });
            }
            setLoading(false);
          }
        }
      ]
    );
  };

  const handleResetLocal = async () => {
    if (!verifyPassword()) return;
    setApiBase(DEFAULT_API_BASE);
    await AsyncStorage.setItem('api_base', DEFAULT_API_BASE);
    Toast.show({ type: 'success', text1: 'Reset', text2: 'Local API reset to default' });
  };

  return (
    <View style={styles.container}>
      <Header title="Admin Panel" subtitle="API Configuration (Password Protected)" />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Current Status */}
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Current API Base</Text>
          <Text style={styles.statusUrl}>{apiBase}</Text>
          <TouchableOpacity onPress={handleResetLocal} style={styles.resetBtn}>
            <Text style={styles.resetText}>Reset to Default</Text>
          </TouchableOpacity>
        </View>

        {/* Admin Password */}
        <Text style={styles.sectionTitle}>Admin Authentication</Text>
        <InputField
          label="Admin Password"
          value={adminPassword}
          onChangeText={setAdminPassword}
          placeholder="Enter admin password"
          secure
        />

        {/* Set Config */}
        <Text style={styles.sectionTitle}>Set API Base (Cloud)</Text>
        <InputField
          label="New API Base URL"
          value={newApiBase}
          onChangeText={setNewApiBase}
          placeholder="https://your-api.com"
        />

        <ActionButton 
          title="Update API Base" 
          onPress={handleSetConfig} 
          loading={loading}
          color="#00d4ff"
        />

        <View style={styles.divider} />

        {/* Get Config */}
        <ActionButton 
          title="Fetch Cloud Config" 
          onPress={handleGetConfig} 
          loading={loading}
          color="#2ed573"
        />

        <View style={styles.divider} />

        {/* Delete Config */}
        <ActionButton 
          title="Clear Cloud Config" 
          onPress={handleDeleteConfig} 
          loading={loading}
          color="#ff4757"
        />

        {result && <ResultViewer data={result} />}

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Admin Only</Text>
          <Text style={styles.infoText}>
            • Password required for all admin actions
          </Text>
          <Text style={styles.infoText}>
            • Cloud config affects all users
          </Text>
          <Text style={styles.infoText}>
            • Local storage saves for offline
          </Text>
          <Text style={styles.infoText}>
            • Default: {DEFAULT_API_BASE}
          </Text>
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
  statusCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    marginTop: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  statusTitle: {
    color: '#00d4ff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  statusUrl: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'monospace',
    marginBottom: 12,
  },
  resetBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  resetText: {
    color: '#ff4757',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#2a2a2a',
    marginVertical: 15,
  },
  infoBox: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  infoTitle: {
    color: '#00d4ff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    color: '#888',
    fontSize: 12,
    lineHeight: 20,
  },
});
    
