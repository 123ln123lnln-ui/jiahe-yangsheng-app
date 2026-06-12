import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Pressable, Image } from 'react-native';
import { styles, colors } from '../components/styles';
import type { AppState, EatRecord } from '../lib/storage';

export function EatScreen({ state, onChange }: { state: AppState, onChange: (s: AppState) => void }) {
  const [input, setInput] = useState('');

  const addRecord = () => {
    if (!input.trim()) return;
    const newRecord: EatRecord = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      content: input,
      type: 'text',
      feedback: '正在分析中...（正式版将由 AI 根据您的体质给出点评）'
    };
    onChange({ ...state, eatRecords: [newRecord, ...state.eatRecords] });
    setInput('');
  };

  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <View style={styles.card}>
      <Text style={styles.h2}>🍽️ 今天想吃点什么？</Text>
      <Text style={styles.sub}>输入想吃的食物，为您分析是否符合体质：</Text>
      <TextInput
        style={{ backgroundColor: '#f5f5f5', borderRadius: 8, padding: 12, marginTop: 12, height: 80, textAlignVertical: 'top' }}
        placeholder="例如：今天特别想吃火锅 / 拍个照..."
        multiline
        value={input}
        onChangeText={setInput}
      />
      <View style={{ flexDirection: 'row', marginTop: 12 }}>
        <Pressable onPress={addRecord} style={{ backgroundColor: colors.green, flex: 1, padding: 12, borderRadius: 8, alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: '700' }}>提交分析</Text>
        </Pressable>
        <Pressable style={{ backgroundColor: '#eee', width: 50, marginLeft: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 20 }}>📷</Text>
        </Pressable>
      </View>
    </View>

    <Text style={[styles.h2, { marginLeft: 4, marginBottom: 10 }]}>📝 饮食记录</Text>
    {state.eatRecords.map(record => (
      <View key={record.id} style={styles.card}>
        <Text style={{ fontWeight: '600' }}>“{record.content}”</Text>
        <Text style={[styles.sub, { fontSize: 10 }]}>{new Date(record.timestamp).toLocaleString()}</Text>
        <View style={{ marginTop: 8, padding: 10, backgroundColor: '#f0f4f7', borderRadius: 6 }}>
          <Text style={{ fontSize: 13, color: '#444' }}>🤖 AI 点评：{record.feedback}</Text>
        </View>
      </View>
    ))}
  </ScrollView>;
}
