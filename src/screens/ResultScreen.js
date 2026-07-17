import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import ResultViewer from '../components/ResultViewer';

export default function ResultScreen({ route, navigation }) {
  const { data } = route.params || {};

  return (
    <View style={styles.container}>
      <Header title="Result" subtitle="API Response" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <ResultViewer data={data} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0a0a0a' 
  },
  scroll: { 
    flex: 1, 
    paddingHorizontal: 15,
    paddingTop: 10,
  },
});
