import { foods } from '../data/foods';
import { currentSolarTerm, seasonOf } from '../data/solarTerms';
import type { Member } from './storage';

export function weatherBySeason() {
  const season = seasonOf();
  if (season === '春') return { text: '18℃ 多云转晴', tip: '乍暖还寒，注意春捂，护住颈背与脚踝。' };
  if (season === '夏') return { text: '32℃ 闷热有雷阵雨', tip: '高温多湿，多补水，避免正午外出与贪凉。' };
  if (season === '秋') return { text: '21℃ 晴朗干燥', tip: '空气干燥，注意补水润燥，护肤防皲裂。' };
  return { text: '6℃ 阴冷', tip: '天气寒冷，注意保暖，温热饮食护阳气。' };
}

export function recommendationFor(member: Member) {
  const term = currentSolarTerm();
  const month = new Date().getMonth() + 1;
  const seasonal = foods.filter((food) => food.months.length === 0 || food.months.includes(month));
  const allergyFiltered = seasonal.filter((food) => {
    if (member.avoidList.includes('海鲜') && food.category === '海') return false;
    if (member.avoidList.includes('生冷') && ['寒', '凉', '微寒'].includes(food.nature)) return false;
    return true;
  });
  const fit = allergyFiltered.filter((food) => {
    // 只要成员的任一体质在食材禁忌中，就排除
    if (member.constitutions.some(c => food.avoid.includes(c))) return false;
    // 如果食材没有特定适合体质，或成员任一体质在适合列表中，则推荐
    return food.fit.length === 0 || member.constitutions.some(c => food.fit.includes(c));
  });
  const avoid = seasonal.filter((food) => member.constitutions.some(c => food.avoid.includes(c)));
  return { term, weather: weatherBySeason(), fit: fit.slice(0, 8), avoid: avoid.slice(0, 5) };
}

export function safetyNote(member: Member) {
  if (member.healthTags.includes('孕期')) return '孕期体质特殊，活血、寒凉、滑利食材请谨慎，具体请遵医嘱。';
  if (member.healthTags.includes('糖尿病')) return '控糖人群请控制高糖水果、蜂蜜、桂圆、红枣等摄入。';
  if (member.healthTags.includes('高血压')) return '高血压人群宜清淡少盐，避免重油重辣。';
  if (member.healthTags.includes('痛风')) return '痛风或高尿酸人群请谨慎选择海鲜、浓汤和动物内脏。';
  return '本建议仅供日常养生参考，不构成医疗诊断或治疗建议。';
}
