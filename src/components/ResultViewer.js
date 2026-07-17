import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';

export default function ResultViewer({ data, type = 'json' }) {
  const displayData = typeof data === 'string' ? data : JSON.stringify(data, null, 2);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(displayData);
    Toast.show({
      type: 'success',
      text1: 'Copied!',
      text2: 'Data copied to clipboard',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Result</Text>
        <TouchableOpacity onPress={copyToClipboard} style={styles.copyBtn}>
          <Ionicons name="copy-outline" size={18} color="#00d4ff" />
          <Text style={styles.copyText}>Copy</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.code}>{displayData}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0d0d0d',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    marginTop: 15,
    maxHeight: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  headerText: {
    color: '#00d4ff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyText: {
    color: '#00d4ff',
    marginLeft: 5,
    fontSize: 13,
  },
  scrollView: {
    padding: 12,
  },
  code: {
    color: '#00ff88',
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 20,
  },
});
