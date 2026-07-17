import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import InputField from '../components/InputField';
import ActionButton from '../components/ActionButton';
import ResultViewer from '../components/ResultViewer';
import FFApi from '../utils/api';
import { ApiContext } from '../../App';
import Toast from 'react-native-toast-message';

export default function ToolsScreen({ navigation }) {
  const { apiBase } = useContext(ApiContext);
  const api = new FFApi(apiBase);

  const [activeTab, setActiveTab] = useState('inspect');

  // Inspect Token
  const [inspectToken, setInspectToken] = useState('');

  // EAT to Access
  const [eatForAccess, setEatForAccess] = useState('');

  // Access Info
  const [accessToken, setAccessToken] = useState('');

  // Bio Update
  const [bioText, setBioText] = useState('');
  const [bioAccessToken, setBioAccessToken] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleInspect = async (method) => {
    if (!inspectToken.trim()) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Please enter token' });
      return;
    }
    setLoading(true);
    try {
      const res = method === 'GET'
        ? await api.inspectToken(inspectToken)
        : await api.inspectTokenPost(inspectToken);
      setResult(res);
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Error', text2: e.message });
    }
    setLoading(false);
  };

  const handleEatToAccess = async (method) => {
    if (!eatForAccess.trim()) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Please enter EAT token' });
      return;
    }
    setLoading(true);
    try {
      const res = method === 'GET'
        ? await api.eatToAccess(eatForAccess)
        : await api.eatToAccessPost(eatForAccess);
      setResult(res);
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Error', text2: e.message });
    }
    setLoading(false);
  };

  const handleAccessInfo = async (method) => {
    if (!accessToken.trim()) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Please enter access token' });
      return;
    }
    setLoading(true);
    try {
      const res = method === 'GET'
        ? await api.accessInfo(accessToken)
        : await api.accessInfoPost(accessToken);
      setResult(res);
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Error', text2: e.message });
    }
    setLoading(false);
  };

  const handleBioUpdate = async (method) => {
    if (!bioText.trim() || !bioAccessToken.trim()) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Please fill all fields' });
      return;
    }
    setLoading(true);
    try {
      const res = method === 'GET'
        ? await api.bioUpdate(bioText, bioAccessToken)
        : await api.bioUpdatePost(bioText, bioAccessToken);
      setResult(res);
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Error', text2: e.message });
    }
    setLoading(false);
  };

  const tabs = [
    { key: 'inspect', label: 'Inspect' },
    { key: 'eataccess', label: 'EAT→Access' },
    { key: 'accessinfo', label: 'Access Info' },
    { key: 'bio', label: 'Bio' },
  ];

  return (
    <View style={styles.container}>
      <Header title="More Tools" subtitle="Inspect / Access / Bio" />

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
          <View style={styles.tabContainer}>
            {tabs.map((tab) => (
              <TouchableOpacity 
                key={tab.key}
                style={[styles.tab, activeTab === tab.key && styles.tabActive]}
                onPress={() => { setActiveTab(tab.key); setResult(null); }}
              >
                <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {activeTab === 'inspect' && (
          <View style={styles.form}>
            <InputField
              label="Token to Inspect"
              value={inspectToken}
              onChangeText={setInspectToken}
              placeholder="Paste token here..."
              multiline
            />
            <View style={styles.methodRow}>
              <ActionButton title="GET" onPress={() => handleInspect('GET')} loading={loading} color="#1e90ff" />
              <View style={{ width: 10 }} />
              <ActionButton title="POST" onPress={() => handleInspect('POST')} loading={loading} color="#70a1ff" />
            </View>
          </View>
        )}

        {activeTab === 'eataccess' && (
          <View style={styles.form}>
            <InputField
              label="EAT Token"
              value={eatForAccess}
              onChangeText={setEatForAccess}
              placeholder="Paste EAT token..."
              multiline
            />
            <View style={styles.methodRow}>
              <ActionButton title="GET" onPress={() => handleEatToAccess('GET')} loading={loading} color="#a55eea" />
              <View style={{ width: 10 }} />
              <ActionButton title="POST" onPress={() => handleEatToAccess('POST')} loading={loading} color="#c56cf0" />
            </View>
          </View>
        )}

        {activeTab === 'accessinfo' && (
          <View style={styles.form}>
            <InputField
              label="Access Token"
              value={accessToken}
              onChangeText={setAccessToken}
              placeholder="Paste access token..."
              multiline
            />
            <View style={styles.methodRow}>
              <ActionButton title="GET" onPress={() => handleAccessInfo('GET')} loading={loading} color="#26de81" />
              <View style={{ width: 10 }} />
              <ActionButton title="POST" onPress={() => handleAccessInfo('POST')} loading={loading} color="#7bed9f" />
            </View>
          </View>
        )}

        {activeTab === 'bio' && (
          <View style={styles.form}>
            <InputField
              label="New Bio Text"
              value={bioText}
              onChangeText={setBioText}
              placeholder="Enter new bio..."
            />
            <InputField
              label="Access Token"
              value={bioAccessToken}
              onChangeText={setBioAccessToken}
              placeholder="Paste access token..."
              multiline
            />
            <View style={styles.methodRow}>
              <ActionButton title="GET" onPress={() => handleBioUpdate('GET')} loading={loading} color="#fd79a8" />
              <View style={{ width: 10 }} />
              <ActionButton title="POST" onPress={() => handleBioUpdate('POST')} loading={loading} color="#e84393" />
            </View>
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
  tabScroll: {
    marginTop: 15,
    marginBottom: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    marginRight: 4,
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
