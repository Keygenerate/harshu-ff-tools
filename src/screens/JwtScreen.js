import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import InputField from '../components/InputField';
import ActionButton from '../components/ActionButton';
import ResultViewer from '../components/ResultViewer';
import FFApi from '../utils/api';
import { ApiContext } from '../../App';
import Toast from 'react-native-toast-message';

export default function JwtScreen({ navigation }) {
  const { apiBase } = useContext(ApiContext);
  const api = new FFApi(apiBase);

  const [activeTab, setActiveTab] = useState('eat'); // 'eat' or 'decode'

  // EAT to JWT states
  const [eatToken, setEatToken] = useState('');

  // Decode JWT states
  const [jwtToDecode, setJwtToDecode] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleEatToJwt = async (method) => {
    if (!eatToken.trim()) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Please enter EAT token' });
      return;
    }
    setLoading(true);
    try {
      const res = method === 'GET'
        ? await api.eatToJwt(eatToken)
        : await api.eatToJwtPost(eatToken);
      setResult(res);
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Error', text2: e.message });
    }
    setLoading(false);
  };

  const handleDecodeJwt = async () => {
    if (!jwtToDecode.trim()) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Please enter JWT to decode' });
      return;
    }
    setLoading(true);
    try {
      const res = await api.decodeJwt(jwtToDecode);
      setResult(res);
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Error', text2: e.message });
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Header title="JWT Tools" subtitle="EAT to JWT / Decode JWT" />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'eat' && styles.tabActive]}
            onPress={() => { setActiveTab('eat'); setResult(null); }}
          >
            <Text style={[styles.tabText, activeTab === 'eat' && styles.tabTextActive]}>
              EAT to JWT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'decode' && styles.tabActive]}
            onPress={() => { setActiveTab('decode'); setResult(null); }}
          >
            <Text style={[styles.tabText, activeTab === 'decode' && styles.tabTextActive]}>
              Decode JWT
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'eat' ? (
          <View style={styles.form}>
            <InputField
              label="EAT Token"
              value={eatToken}
              onChangeText={setEatToken}
              placeholder="Paste your EAT token here..."
              multiline
            />

            <View style={styles.methodRow}>
              <ActionButton 
                title="GET Request" 
                onPress={() => handleEatToJwt('GET')} 
                loading={loading}
                color="#2ed573"
              />
              <View style={{ width: 10 }} />
              <ActionButton 
                title="POST Request" 
                onPress={() => handleEatToJwt('POST')} 
                loading={loading}
                color="#7bed9f"
              />
            </View>
          </View>
        ) : (
          <View style={styles.form}>
            <InputField
              label="JWT Token"
              value={jwtToDecode}
              onChangeText={setJwtToDecode}
              placeholder="Paste JWT to decode..."
              multiline
            />

            <ActionButton 
              title="Decode JWT" 
              onPress={handleDecodeJwt} 
              loading={loading}
              color="#ffa502"
            />
          </View>
        )}

        {result && <ResultViewer data={result} />}
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
