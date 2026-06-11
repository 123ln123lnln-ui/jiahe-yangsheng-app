import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, StatusBar, Text, View } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { FoodScreen } from './src/screens/FoodScreen';
import { MealScreen } from './src/screens/MealScreen';
import { FamilyScreen } from './src/screens/FamilyScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { type AppState, defaultState, loadState, saveState } from './src/lib/storage';
import { currentSolarTerm } from './src/data/solarTerms';
import { colors } from './src/components/styles';

type Tab = 'home' | 'food' | 'meal' | 'family' | 'settings';

const tabs: { key: Tab; icon: string; label: string }[] = [
  { key: 'home', icon: '🏠', label: '今日' },
  { key: 'food', icon: '🥗', label: '食材' },
  { key: 'meal', icon: '🍲', label: '共餐' },
  { key: 'family', icon: '👨‍👩‍👧', label: '家人' },
  { key: 'settings', icon: '⚙️', label: '设置' },
];

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [state, setState] = useState<AppState>(defaultState);
  useEffect(() => { loadState().then(setState); }, []);
  const updateState = (next: AppState) => {
    setState(next);
    void saveState(next);
  };
  const term = currentSolarTerm();
  return <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle="light-content" backgroundColor={colors.greenDark} />
      <View style={{ backgroundColor: colors.greenDark, padding: 16 }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: '800' }}>和 家和养生</Text>
        <Text style={{ color: '#f5f2ea', marginTop: 4 }}>📍 {state.province}·{state.city} · {term.name} · 顺时养生，全家安康</Text>
      </View>
      <View style={{ flex: 1 }}>
        {tab === 'home' ? <HomeScreen state={state} /> : null}
        {tab === 'food' ? <FoodScreen /> : null}
        {tab === 'meal' ? <MealScreen state={state} /> : null}
        {tab === 'family' ? <FamilyScreen state={state} onChange={updateState} /> : null}
        {tab === 'settings' ? <SettingsScreen state={state} onChange={updateState} /> : null}
      </View>
      <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.line, backgroundColor: 'white' }}>
        {tabs.map((item) => {
          const active = tab === item.key;
          return <Pressable key={item.key} onPress={() => setTab(item.key)} style={{ flex: 1, alignItems: 'center', paddingVertical: 9 }}>
            <Text style={{ fontSize: 20 }}>{item.icon}</Text>
            <Text style={{ color: active ? colors.green : colors.sub, fontSize: 11, fontWeight: active ? '700' : '400' }}>{item.label}</Text>
          </Pressable>;
        })}
      </View>
    </SafeAreaView>
  </SafeAreaProvider>;
}
