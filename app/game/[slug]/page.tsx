import { characters } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export function generateStaticParams() {
  return [{ slug: 'uma-musume' }];
}

interface UmaBuild {
  role: string; cards: string; inherit: string; desc: string; tier: string;
}

const builds: Record<string, UmaBuild[]> = {
  spe: [
    { role:"泛用育成", cards:"キタサンSSR + スズカSSR + ブルボンSSR + ゴルシSSR + ラモーヌSSR + 友人", inherit:"速度9 + 耐力3", desc:"通用配卡，URA/青春杯通用，稳定UF+", tier:"S" },
    { role:"长距离特化", cards:"キタサンSSR + ブルボンSSR + サトノSSR + ゴルシSSR + ラモーヌSSR + 友人", inherit:"耐力9 + 速度6", desc:"长距离大赛向，耐力拉满", tier:"A+" },
  ],
  suzuka: [
    { role:"逃马最优", cards:"キタサンSSR + スズカSSR + ラモーヌSSR + スイープSSR + 友人 + 根性SSR", inherit:"速度9 + 耐力6", desc:"逃马天花板配卡，中距离大赛T0", tier:"SS" },
    { role:"英里逃马", cards:"キタサンSSR + スズカSSR + マックSSR + ラモーヌSSR + 友人 + 根性SSR", inherit:"速度9 + 力量3", desc:"英里赛特化", tier:"S" },
  ],
  teio: [
    { role:"中距离先行", cards:"キタサンSSR + スズカSSR + ラモーヌSSR + ゴルシSSR + スイープSSR + 友人", inherit:"速度9 + 力量6", desc:"帝王固有+先行战术，中距离胜率极高", tier:"S" },
    { role:"差し流", cards:"キタサンSSR + ラモーヌSSR + ゴルシSSR + スイープSSR + ネイチャSSR + 友人", inherit:"力量9 + 根性6", desc:"差し跑法特化，追越爆发力强", tier:"A+" },
  ],
  oguri: [
    { role:"追込力量型", cards:"キタサンSSR + ラモーヌSSR + ゴルシSSR + ネイチャSSR + マックSSR + 友人", inherit:"力量9 + 根性6", desc:"追込核心卡，终盘爆发毁灭级", tier:"S" },
  ],
  mcqueen: [
    { role:"长距离之王", cards:"ブルボンSSR + サトノSSR + キタサンSSR + ゴルシSSR + ラモーヌSSR + 友人", inherit:"耐力9 + 根性6", desc:"长距离专用配卡，天皇赏春/有马纪念T0", tier:"SS" },
  ],
  gold: [
    { role:"追込根性流", cards:"ゴルシSSR + ラモーヌSSR + ネイチャSSR + キタサンSSR + スイープSSR + 友人", inherit:"根性9 + 力量6", desc:"根性追込特化，后半程几乎不掉速", tier:"S" },
  ],
  daiwa: [
    { role:"中距离逃先", cards:"キタサンSSR + スズカSSR + ラモーヌSSR + スイープSSR + 友人 + 根性SSR", inherit:"速度9 + 力量6", desc:"逃先双修，固有技能稳定触发", tier:"S" },
  ],
  grass: [
    { role:"差し爆发流", cards:"キタサンSSR + ラモーヌSSR + ゴルシSSR + ネイチャSSR + スイープSSR + 友人", inherit:"力量9 + 速度6", desc:"差し战术，终盘加速爆炸", tier:"S" },
  ],
  condor: [
    { role:"智力先行", cards:"スイープSSR + キタサンSSR + ラモーヌSSR + ゴルシSSR + ネイチャSSR + 友人", inherit:"智力6 + 速度9", desc:"智力核心，技能发动率极高", tier:"A+" },
  ],
  rice: [
    { role:"长距离耐力", cards:"ブルボンSSR + サトノSSR + キタサンSSR + ゴルシSSR + ラモーヌSSR + 友人", inherit:"耐力9 + 根性6", desc:"长距离耐力特化，菊花赏/天皇赏春向", tier:"A" },
  ],
  opera: [
    { role:"智力先行", cards:"スイープSSR + キタサンSSR + ラモーヌSSR + ブルボンSSR + ゴルシSSR + 友人", inherit:"智力6 + 耐力6", desc:"智力+耐力均衡型", tier:"A" },
  ],
  bamboo: [
    { role:"长距离差し", cards:"ブルボンSSR + サトノSSR + キタサンSSR + ラモーヌSSR + ゴルシSSR + 友人", inherit:"耐力9 + 速度6", desc:"长距离差し战术", tier:"A+" },
  ],
};

export default function GamePage() {
  return (
    <div className="container-main py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold mb-2">赛马娘 Pretty Derby</h1>
        <p className="text-dim">ウマ娘 プリティーダービー · 养成模拟 · Cygames</p>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="tag">养成</span><span className="tag">模拟</span><span className="tag">竞技</span><span className="tag">二次元</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">🏇 全角色育成配卡（{characters.length}位）</h2>

      <div className="space-y-6">
        {characters.map(c => {
          const b = builds[c.id] || [];
          return (
            <div key={c.id} id={c.id} className="card p-5 scroll-mt-20">
              <div className="flex items-start gap-4 flex-wrap">
                <div className="w-14 h-14 rounded-lg bg-bg-alt flex items-center justify-center text-3xl shrink-0">{c.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold">{c.name}</h3>
                    <span className="text-gold text-sm">{'★'.repeat(c.rarity)}</span>
                    <span className="text-dim text-xs">{c.jp}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    <span className="tag">{c.style}</span>
                    <span className="tag">{c.dist}</span>
                    <span className="text-xs text-dim mt-1">固有: {c.skill}</span>
                  </div>
                  {/* 属性条 */}
                  <div className="grid grid-cols-5 gap-2 mt-3 max-w-xl">
                    {(['speed','stamina','power','guts','wisdom'] as const).map(k => {
                      const labels = {speed:'速度',stamina:'耐力',power:'力量',guts:'根性',wisdom:'智力'};
                      const colors = {speed:'bg-primary',stamina:'bg-blue-400',power:'bg-orange-400',guts:'bg-purple-400',wisdom:'bg-green-400'};
                      return (
                        <div key={k} className="text-center">
                          <div className="h-16 bg-bg rounded-md relative overflow-hidden mb-1">
                            <div className={`absolute bottom-0 left-0 right-0 rounded-b-md ${colors[k]} transition-all`}
                                 style={{height:`${c.stats[k]}%`}}></div>
                          </div>
                          <div className="text-xs font-bold">{c.stats[k]}</div>
                          <div className="text-[10px] text-dim">{labels[k]}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* 配卡方案 */}
              {b.length > 0 && (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-border text-dim text-left">
                        <th className="p-2">方案</th>
                        <th className="p-2">推荐支援卡</th>
                        <th className="p-2">因子继承</th>
                        <th className="p-2 hidden md:table-cell">说明</th>
                        <th className="p-2 w-12">评级</th>
                      </tr>
                    </thead>
                    <tbody>
                      {b.map((build,i) => (
                        <tr key={i} className="border-b border-border">
                          <td className="p-2 font-medium text-xs sm:text-sm">{build.role}</td>
                          <td className="p-2 text-xs">{build.cards}</td>
                          <td className="p-2 text-xs">{build.inherit}</td>
                          <td className="p-2 text-xs text-dim hidden md:table-cell">{build.desc}</td>
                          <td className="p-2"><span className={`tier-badge tier-${build.tier === 'SS' ? 'ss' : build.tier === 'S' ? 's' : build.tier === 'A+' ? 'a' : 'b'}`}>{build.tier}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
