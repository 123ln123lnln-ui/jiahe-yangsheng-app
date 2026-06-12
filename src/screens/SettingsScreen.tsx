import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Pressable, Alert } from 'react-native';
import type { AppState, Member } from '../lib/storage';
import { styles, colors } from '../components/styles';
import { constitutions } from '../data/constitutions';

const ALL_HEALTH_TAGS = ['孕期', '糖尿病', '高血压', '痛风', '久坐', '熬夜', '压力大', '花粉过敏'];

export function SettingsScreen({ state, onChange }: { state: AppState; onChange: (s: AppState) => void }) {
  const model = state.model;
  const updateModel = (patch: Partial<typeof model>) => onChange({ ...state, model: { ...model, ...patch } });

  const toggleMemberField = (memberId: string, field: 'constitutions' | 'healthTags', value: string) => {
    const nextMembers = state.members.map(m => {
      if (m.id !== memberId) return m;
      const list = (m[field] as string[]).includes(value)
        ? (m[field] as string[]).filter(v => v !== value)
        : [...(m[field] as string[]), value];
      return { ...m, [field]: list };
    });
    onChange({ ...state, members: nextMembers });
  };

  const deleteMember = (id: string) => {
    if (state.members.length <= 1) return Alert.alert('提示', '请至少保留一个成员');
    onChange({ ...state, members: state.members.filter(m => m.id !== id) });
  };

  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <Text style={styles.h2}>👨‍👩‍👧 家庭成员管理</Text>
    {state.members.map(m => (
      <View key={m.id} style={styles.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: colors.greenDark }}>{m.name}</Text>
          <Pressable onPress={() => deleteMember(m.id)}><Text style={{ color: colors.danger }}>删除</Text></Pressable>
        </View>

        <Text style={[styles.sub, { marginTop: 12 }]}>体质（可多选）</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}>
          {Object.keys(constitutions).map(c => (
            <Pressable key={c} onPress={() => toggleMemberField(m.id, 'constitutions', c)} style={{
              paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, marginRight: 6, marginBottom: 6,
              backgroundColor: m.constitutions.includes(c as any) ? colors.green : '#f0f0f0'
            }}>
              <Text style={{ fontSize: 12, color: m.constitutions.includes(c as any) ? 'white' : '#666' }}>{c}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={[styles.sub, { marginTop: 8 }]}>健康与过敏标签</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}>
          {ALL_HEALTH_TAGS.map(t => (
            <Pressable key={t} onPress={() => toggleMemberField(m.id, 'healthTags', t)} style={{
              paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, marginRight: 6, marginBottom: 6,
              backgroundColor: m.healthTags.includes(t) ? colors.greenDark : '#f0f0f0'
            }}>
              <Text style={{ fontSize: 12, color: m.healthTags.includes(t) ? 'white' : '#666' }}>{t}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    ))}

    <View style={styles.card}>
      <Text style={styles.h2}>⚙️ 大模型配置</Text>
      <Text style={styles.sub}>API Key</Text>
      <TextInput style={styles.input} secureTextEntry value={model.apiKey} onChangeText={(apiKey) => updateModel({ apiKey })} placeholder="sk-..." />
    </View>

    <View style={styles.card}>
      <Text style={styles.h2}>免责声明</Text>
      <Text style={styles.sub}>内容仅供日常养生参考，不构成医疗建议。</Text>
    </View>
  </ScrollView>;
}
