// ====== 赛马娘角色数据 ======
export interface UmaCharacter {
  id: string;
  name: string;
  jp: string;
  icon: string;
  rarity: number;
  style: string;
  dist: string;
  stats: { speed: number; stamina: number; power: number; guts: number; wisdom: number };
  skill: string;
  skillDesc: string;
}

export const characters: UmaCharacter[] = [
  { id:"spe", name:"特别周", jp:"スペシャルウィーク", icon:"🐎", rarity:3, style:"先行", dist:"中~长", stats:{speed:90,stamina:80,power:82,guts:78,wisdom:76}, skill:"末脚", skillDesc:"终盘冲刺能力大幅提升" },
  { id:"suzuka", name:"无声铃鹿", jp:"サイレンススズカ", icon:"💨", rarity:3, style:"逃げ", dist:"中", stats:{speed:98,stamina:70,power:78,guts:85,wisdom:82}, skill:"逃げ切り", skillDesc:"领头跑法终盘加速力提升" },
  { id:"teio", name:"东海帝王", jp:"トウカイテイオー", icon:"👑", rarity:3, style:"先行/差し", dist:"中", stats:{speed:93,stamina:78,power:85,guts:90,wisdom:80}, skill:"帝王の末脚", skillDesc:"最终直线路段速度大幅提升" },
  { id:"oguri", name:"小栗帽", jp:"オグリキャップ", icon:"🏃", rarity:3, style:"差し/追込", dist:"中~长", stats:{speed:86,stamina:80,power:96,guts:84,wisdom:76}, skill:"豪脚", skillDesc:"力量型冲刺，追越对手时加速" },
  { id:"mcqueen", name:"目白麦昆", jp:"メジロマックイーン", icon:"🏔️", rarity:3, style:"先行", dist:"长", stats:{speed:80,stamina:97,power:80,guts:86,wisdom:84}, skill:"長距離の鬼", skillDesc:"长距离赛事后半段大幅提速" },
  { id:"gold", name:"黄金船", jp:"ゴールドシップ", icon:"🏴‍☠️", rarity:3, style:"追込", dist:"中~长", stats:{speed:84,stamina:78,power:84,guts:98,wisdom:72}, skill:"我慢強い", skillDesc:"领先时保持速度不衰减" },
  { id:"daiwa", name:"大和赤骥", jp:"ダイワスカーレット", icon:"🔥", rarity:3, style:"逃げ/先行", dist:"中", stats:{speed:94,stamina:80,power:86,guts:84,wisdom:78}, skill:"先頭プライド", skillDesc:"带头时所有属性小幅提升" },
  { id:"grass", name:"草上飞", jp:"グラスワンダー", icon:"🌿", rarity:3, style:"差し", dist:"中", stats:{speed:86,stamina:78,power:93,guts:85,wisdom:83}, skill:"差し切り", skillDesc:"差し跑法终盘爆发加速" },
  { id:"condor", name:"神鹰", jp:"エルコンドルパサー", icon:"🦅", rarity:3, style:"先行/差し", dist:"中", stats:{speed:84,stamina:82,power:80,guts:82,wisdom:95}, skill:"冷静沈着", skillDesc:"比赛中盘技能发动率提升" },
  { id:"rice", name:"米浴", jp:"ライスシャワー", icon:"🌹", rarity:2, style:"先行", dist:"长", stats:{speed:76,stamina:92,power:74,guts:88,wisdom:80}, skill:"不屈の心", skillDesc:"被围困时突破能力提升" },
  { id:"opera", name:"好歌剧", jp:"テイエムオペラオー", icon:"🎭", rarity:2, style:"先行", dist:"中~长", stats:{speed:78,stamina:76,power:75,guts:82,wisdom:92}, skill:"王者の余裕", skillDesc:"体力充足时战术判断力提升" },
  { id:"bamboo", name:"琵琶晨光", jp:"ビワハヤヒデ", icon:"💎", rarity:3, style:"先行/差し", dist:"长", stats:{speed:83,stamina:94,power:82,guts:84,wisdom:77}, skill:"冷静な分析", skillDesc:"赛事前半段精准体力分配" },
];

// ====== 支援卡 Tier ======
export interface SupportCard {
  tier: string;
  name: string;
  type: string;
  skill: string;
  comment: string;
}

export const supportCards: SupportCard[] = [
  { tier:"SS", name:"キタサンブラック SSR", type:"速度", skill:"弧線のプロフェッサー", comment:"弯道加速，全场景泛用第一" },
  { tier:"SS", name:"サイレンススズカ SSR", type:"速度", skill:"逃げコーナー◎", comment:"逃马核心，弯道性能顶级" },
  { tier:"SS", name:"カジノドライヴ SSR", type:"友人", skill:"Dreams Boost", comment:"Beyond Dreams核心卡，DP获取翻倍" },
  { tier:"S", name:"ミホノブルボン SSR", type:"耐力", skill:"鋼の意志", comment:"长距离耐力卡天花板" },
  { tier:"S", name:"ゴールドシップ SSR", type:"根性", skill:"不屈の心", comment:"差し/追込泛用根性卡" },
  { tier:"S", name:"メジロラモーヌ SSR", type:"力量", skill:"パワーボム", comment:"力量卡首选，中距离必备" },
  { tier:"S", name:"真機伶 SSR", type:"智力", skill:"Cutest in Ur ♡", comment:"新卡，智力+技能触发率顶级" },
  { tier:"A", name:"スイープトウショウ SSR", type:"智力", skill:"クールダウン", comment:"智力核心卡，技能发动率保障" },
  { tier:"A", name:"ナイスネイチャ SSR", type:"根性", skill:"差しの極意", comment:"差し战术专用根性卡" },
  { tier:"A", name:"サトノダイヤモンド SSR", type:"耐力", skill:"長距離の星", comment:"长距离耐力补强" },
  { tier:"A", name:"生野狄杜斯 SSR", type:"力量", skill:"铁娘子也露出微笑", comment:"新力量卡，中距离强力补位" },
  { tier:"B", name:"スペシャルウィーク SSR", type:"速度", skill:"末脚", comment:"新手友好，终盘加速入门卡" },
  { tier:"B", name:"駿川たづな SSR", type:"友人", skill:"お出かけ", comment:"友人卡，体力管理+事件回复" },
];

// ====== 攻略文章元数据 ======
export interface GuideMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  author: string;
  version?: string;
}

export const guides: GuideMeta[] = [
  {
    slug: 'beginner-guide', title: '赛马娘新手入门完全攻略',
    description: '从下载到首次育成，手把手教你入门赛马娘。包含基础概念、育成流程、资源规划。',
    category: '入门', tags: ['新手', '入门', '育成基础'], date: '2026-06-15', author: '攻略组',
  },
  {
    slug: 'tier-list', title: 'SSR 支援卡强度榜（2026年6月最新）',
    description: '当前版本全部 SSR 支援卡强度评级与育成配卡思路，SS/S/A/B 四级排行。',
    category: '排行', tags: ['支援卡', 'Tier', '强度榜'], date: '2026-06-17', author: '数据组', version: '2026.06',
  },
  {
    slug: 'training-guide', title: 'URA 育成系统深度解析',
    description: '详解 URA 育成模式的核心机制：训练设施选择、比赛规划、体力管理、因子继承。',
    category: '育成', tags: ['URA', '育成', '训练'], date: '2026-06-14', author: '攻略组',
  },
  {
    slug: 'support-card-guide', title: '支援卡配卡思路与编成逻辑',
    description: '从零理解支援卡编成系统：卡组构成、得意率、友情训练、事件选择优先级。',
    category: '进阶', tags: ['支援卡', '配卡', '编成'], date: '2026-06-13', author: '攻略组',
  },
  {
    slug: 'inheritance-guide', title: '因子继承机制全解',
    description: '因子系统深入剖析：蓝因子/红因子/绿因子/白因子的继承规则与优先级。',
    category: '进阶', tags: ['因子', '继承', '育成'], date: '2026-06-12', author: '数据组',
  },
  {
    slug: 'beyond-dreams', title: 'Beyond Dreams 育成剧本完全攻略',
    description: '2026年2月上线的最新育成剧本，详解 Dreams 训练、メンバー系统、ブリダーズカップ制霸路线。',
    category: '育成', tags: ['Beyond Dreams', '最新剧本', 'BC'], date: '2026-06-17', author: '攻略组', version: '2026.06',
  },
];

// ====== 赛事日历 ======
export interface Event {
  month: string; day: string; title: string; desc: string; type: string;
}
export const events: Event[] = [
  { month:"6月", day:"20", title:"冠军杯 2026 Summer", desc:"中距离 · 东京 · 芝 · 左回", type:"大赛" },
  { month:"6月", day:"25", title:"新 SS 支援卡池开启", desc:"预计新增キタサンブラック新卡", type:"卡池" },
  { month:"7月", day:"01", title:"传奇赛 宝塚記念", desc:"阪神 · 芝2200m · 右回", type:"传奇" },
  { month:"7月", day:"08", title:"LOH 第12赛季", desc:"联赛对战 · 主题：短距离", type:"联赛" },
];

// ====== 搜索功能 ======
export function searchAll(query: string) {
  const q = query.toLowerCase();
  const results: { type: string; title: string; desc: string; href: string }[] = [];

  characters.forEach(c => {
    if (c.name.includes(q) || c.jp.toLowerCase().includes(q) || c.style.includes(q) || c.skill.includes(q)) {
      results.push({ type:'赛马娘', title:`${c.icon} ${c.name}`, desc:`${c.rarity}星 · ${c.style} · ${c.dist} · 固有:${c.skill}`, href:`/game/uma-musume#${c.id}` });
    }
  });

  supportCards.forEach(s => {
    if (s.name.toLowerCase().includes(q) || s.skill.toLowerCase().includes(q) || s.type.includes(q)) {
      results.push({ type:'支援卡', title:`${s.name}`, desc:`Tier ${s.tier} · ${s.type} · ${s.skill}`, href:'/guide/tier-list' });
    }
  });

  guides.forEach(g => {
    if (g.title.includes(q) || g.tags.some(t => t.includes(q)) || g.category.includes(q)) {
      results.push({ type:'攻略', title:g.title, desc:g.description, href:`/guide/${g.slug}` });
    }
  });

  return results;
}
