import React from 'react';
import { ScrollView, View, Text, TextInput, Pressable } from 'react-native';
import type { AppState } from '../lib/storage';
import { styles, colors } from '../components/styles';

export function SettingsScreen({ state, onChange }: { state: AppState; onChange: (s: AppState) => void }) {
  const model = state.model;
  const updateModel = (patch: Partial<typeof model>) => onChange({ ...state, model: { ...model, ...patch } });
  return <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
    <View style={styles.card}>
      <Text style={styles.h2}>⚙️ 大模型配置</Text>
      <Text style={styles.sub}>当前默认：DeepSeek V4 Pro。正式接入时，建议所有 AI 输出先走规则层过滤，再展示给用户。</Text>
      <Text style={[styles.sub, { marginTop: 12 }]}>服务商</Text>
      <TextInput style={styles.input} value={model.provider} onChangeText={(provider) => updateModel({ provider })} />
      <Text style={styles.sub}>模型名称</Text>
      <TextInput style={styles.input} value={model.model} onChangeText={(modelName) => updateModel({ model: modelName })} />
      <Text style={styles.sub}>API Endpoint</Text>
      <TextInput style={styles.input} autoCapitalize="none" value={model.endpoint} onChangeText={(endpoint) => updateModel({ endpoint })} />
      <Text style={styles.sub}>API Key</Text>
      <TextInput style={styles.input} secureTextEntry value={model.apiKey} onChangeText={(apiKey) => updateModel({ apiKey })} placeholder="sk-..." />
      <Pressable style={[styles.button, { backgroundColor: colors.gold }]} onPress={() => updateModel({ provider: 'DeepSeek', model: 'DeepSeek V4 Pro', endpoint: 'https://api.deepseek.com/chat/completions' })}>
        <Text style={styles.buttonText}>恢复 DeepSeek V4 Pro 默认配置</Text>
      </Pressable>
    </View>

    <View style={styles.card}>
      <Text style={styles.h2}>🛡️ 数据准确与安全策略</Text>
      <Text style={styles.text}>1. 节气采用 2026 年节气日期表，不再用固定月日粗略判断。</Text>
      <Text style={styles.text}>2. 食材推荐先走本地结构化规则：体质、月份、忌口、过敏、健康标签过滤。</Text>
      <Text style={styles.text}>3. 大模型只负责把已筛选的候选食材组织成自然语言，不允许绕过禁忌规则。</Text>
      <Text style={styles.text}>4. 特殊人群（孕期、慢病、过敏）强制展示保守提醒和免责声明。</Text>
    </View>

    <View style={styles.card}>
      <Text style={styles.h2}>免责声明</Text>
      <Text style={styles.sub}>本产品提供的内容仅供日常养生参考，不构成医疗诊断、治疗或用药建议；疾病、孕期、术后恢复等情况请咨询专业医师。</Text>
    </View>
  </ScrollView>;
}
