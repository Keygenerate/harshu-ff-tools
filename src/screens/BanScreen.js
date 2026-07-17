import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import InputField from '../components/InputField';
import ActionButton from '../components/ActionButton';
import ResultViewer from '../components/ResultViewer';
import FFApi from '../utils/api';
import { ApiContext } from '../../App';
import Toast from 'react-native-toast-message';

export default function BanScreen({ navigation }) {
  const { apiBase } = useContext(ApiContext);
  const api = new FFApi(apiBase);

  const [activeTab, setActiveTab] = useState('auto'); // 'auto' or 'banonly'

  // Auto Ban states
  const [token, setToken] = useState('');
  const [version, setVersion] = useState('OB54');
  const [autoBan, setAutoBan] = useState(true);

  // Ban Only states
  const [jwt, setJwt] = useState('');
  const [banVersion, setBanVersion] = useState('OB54');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAutoBan = async (method) => {
    if (!token.trim()) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Please enter EAT token' });
      return;
    }
    setLoading(true);
    try {
      const res = method === 'GET' 
        ? await api.autoBan(token, version, autoBan)
        : await api.autoBanPost(token, version, autoBan);
      setResult(res);
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Error', text2: e.message });
    }
    setLoading(false);
  };

  const handleBanOnly = async (method) => {
    if (!jwt.trim()) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Please enter JWT' });
      return;
    }
    setLoading(true);
    try {
      const res = method === 'GET'
        ? await api.banOnly(jwt, banVersion)
        : await api.banOnlyPost(jwt, banVersion);
      setResult(res);
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Error', text2: e.message });
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Header title="Ban Tools" subtitle="Auto JWT + Ban / Ban Only" />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'auto' && styles.tabActive]}
            onPress={() => { setActiveTab('auto'); setResult(null); }}
          >
            <Text style={[styles.tabText, activeTab === 'auto' && styles.tabTextActive]}>
              Auto JWT + Ban
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'banonly' && styles.tabActive]}
            onPress={() => { setActiveTab('banonly'); setResult(null); }}
          >
            <Text style={[styles.tabText, activeTab === 'banonly' && styles.tabTextActive]}>
              Ban Only
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'auto' ? (
          <View style={styles.form}>
            <InputField
              label="EAT Token"
              value={token}
              onChangeText={setToken}
              placeholder="Paste your EAT token here..."
              multiline
            />
            <InputField
              label="Game Version"
              value={version}
              onChangeText={setVersion}
              placeholder="e.g., OB54"
            />

            <View style={styles.methodRow}>
              <ActionButton 
                title="GET Request" 
                onPress={() => handleAutoBan('GET')} 
                loading={loading}
                color="#ff4757"
              />
              <View style={{ width: 10 }} />
              <ActionButton 
                title="POST Request" 
                onPress={() => handleAutoBan('POST')} 
                loading={loading}
                color="#ff6b81"
              />
            </View>
          </View>
        ) : (
          <View style={styles.form}>
            <InputField
              label="JWT Token"
              value={jwt}
              onChangeText={setJwt}
              placeholder="Paste your JWT here..."
              multiline
            />
            <InputField
              label="Game Version"
              value={banVersion}
              onChangeText={setBanVersion}
              placeholder="e.g., OB54"
            />

            <View style={styles.methodRow}>
              <ActionButton 
                title="GET Request" 
                onPress={() => handleBanOnly('GET')} 
                loading={loading}
                color="#ff4757"
              />
              <View style={{ width: 10 }} />
              <ActionButton 
                title="POST Request" 
                onPress={() => handleBanOnly('POST')} 
                loading={loading}
                color="#ff6b81"
              />
            </View>
          </View>
        )}

        {result && <ResultViewer data={result} />}
      </ScrollView>
    </View>
  );
}

import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: '#2a2a2a',
  },
  tabText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 13,
  },
  tabTextActive: {
    color: '#00d4ff',
  },
  form: {
    marginTop: 5,
  },
  methodRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
