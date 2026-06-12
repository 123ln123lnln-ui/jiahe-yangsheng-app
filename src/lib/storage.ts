import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Constitution } from '../data/constitutions';

export type Member = {
  id: string;
  name: string;
  gender: '男' | '女';
  age: number;
  constitutions: Constitution[]; // 改为多选
  healthTags: string[];
  avoidList: string[];
};

export type EatRecord = {
  id: string;
  timestamp: number;
  content: string; // 文本或图片路径
  type: 'text' | 'image';
  feedback?: string; // AI点评
};

export type AppState = {
  family: string;
  province: string;
  city: string;
  currentMemberId: string;
  members: Member[];
  model: ModelConfig;
  eatRecords: EatRecord[]; // 新增想吃记录
};

export const defaultState: AppState = {
  family: '我的家',
  province: '浙江',
  city: '杭州',
  currentMemberId: 'm1',
  members: [
    { id: 'm1', name: '妈妈', gender: '女', age: 36, constitutions: ['平和质'], healthTags: [], avoidList: [] },
  ],
  model: {
    provider: 'DeepSeek',
    model: 'DeepSeek V4 Pro',
    endpoint: 'https://api.deepseek.com/chat/completions',
    apiKey: '',
  },
  eatRecords: [],
};

const key = 'jiahe-yangsheng-state-v1';

export async function loadState(): Promise<AppState> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return defaultState;
  return { ...defaultState, ...JSON.parse(raw) };
}

export async function saveState(state: AppState): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(state));
}
