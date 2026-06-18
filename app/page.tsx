'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { guides, characters, supportCards, events } from '@/lib/data';
import { externalGuides } from '@/lib/external-guides';

export default function HomePage() {
  const latestGuides = useMemo(() => [...guides].sort((a,b) => b.date.localeCompare(a.date)).slice(0,5), []);
  const topChars = useMemo(() => [...characters].sort((a,b) => b.rarity - a.rarity || b.stats.speed - a.stats.speed).slice(0,6), []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container-main py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="text-primary">赛马娘</span>攻略 Wiki
          </h1>
          <p className="text-dim text-lg md:text-xl max-w-2xl mx-auto mb-8">
            最全面的育成攻略 · 支援卡推荐 · 角色图鉴 · 赛事资讯<br/>
            <span className="text-sm">选一匹马 → 看配卡方案 → 省去 3 小时试错</span>
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/guide/beginner-guide" className="btn-primary">🎓 新手上路</Link>
            <Link href="/guide/tier-list" className="btn-outline">📊 Tier 排行</Link>
            <Link href="/guide/training-guide" className="btn-outline">📖 育成攻略</Link>
          </div>
          <div className="flex justify-center gap-8 mt-10 text-center">
            {[{n:'10+',l:'赛马娘'},{n:'6篇',l:'深度攻略'},{n:'13张',l:'SSR评测'},{n:'周更',l:'赛事日历'}].map(s=>(
              <div key={s.l}><div className="text-2xl font-extrabold text-gold">{s.n}</div><div className="text-xs text-dim mt-1">{s.l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* 角色速查 */}
      <section className="container-main py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">🏇 赛马娘速查</h2>
          <Link href="/game/uma-musume" className="text-sm text-primary hover:underline">查看全部 →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {topChars.map(c => (
            <Link key={c.id} href={`/game/uma-musume#${c.id}`} className="card p-4 text-center group">
              <div className="text-3xl mb-2">{c.icon}</div>
              <div className="text-sm font-semibold group-hover:text-primary transition-colors">{c.name}</div>
              <div className="text-xs text-dim mt-1">{'⭐'.repeat(c.rarity)} · {c.style}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* 最新攻略 */}
      <section className="bg-bg-alt">
        <div className="container-main py-12">
          <h2 className="text-2xl font-bold mb-6">📝 最新攻略</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestGuides.map(g => (
              <Link key={g.slug} href={`/guide/${g.slug}`} className="card p-5 group">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="tag">{g.category}</span>
                  {g.version && <span className="tag">{g.version}</span>}
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{g.title}</h3>
                <p className="text-xs text-dim mb-3 line-clamp-2">{g.description}</p>
                <div className="flex items-center justify-between text-xs text-dim">
                  <span>{g.author}</span>
                  <span>{g.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 外部最新攻略聚合 */}
      <section className="container-main py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">🌐 社区最新攻略</h2>
            <p className="text-xs text-dim mt-1">实时聚合 GameWith · NGA · 巴哈姆特等社区最新攻略</p>
          </div>
          <span className="text-xs text-dim">自动更新</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {externalGuides.map((g, i) => (
            <a key={i} href={g.url} target="_blank" rel="noopener noreferrer" className="card p-5 group border-l-2 border-primary/40 hover:border-primary transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{g.source}</span>
                <span className="text-xs text-dim">{g.date}</span>
              </div>
              <h3 className="font-semibold text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2">{g.title}</h3>
              <p className="text-xs text-dim mb-3 line-clamp-2">{g.snippet}</p>
              <div className="flex flex-wrap gap-1">
                {g.tags.map(t => <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-bg-alt text-dim">{t}</span>)}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 支援卡 Tier + 赛事日历 */}
      <section className="container-main py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* 支援卡 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">📊 SSR Tier 排行</h2>
              <Link href="/guide/tier-list" className="text-sm text-primary hover:underline">查看全部 →</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-border text-dim text-left">
                    <th className="p-2 w-12"></th><th className="p-2">名称</th><th className="p-2">类型</th><th className="p-2 hidden sm:table-cell">技能</th>
                  </tr>
                </thead>
                <tbody>
                  {supportCards.slice(0,6).map((c,i) => (
                    <tr key={i} className="border-b border-border hover:bg-bg-card/50 transition-colors">
                      <td className="p-2"><span className={`tier-badge tier-${c.tier.toLowerCase()}`}>{c.tier}</span></td>
                      <td className="p-2 font-medium text-xs sm:text-sm">{c.name}</td>
                      <td className="p-2 text-dim text-xs">{c.type}</td>
                      <td className="p-2 text-dim text-xs hidden sm:table-cell">{c.skill}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* 赛事日历 */}
          <div>
            <h2 className="text-2xl font-bold mb-4">📅 赛事日历</h2>
            <div className="space-y-3">
              {events.map((e,i) => (
                <div key={i} className="card p-4 flex gap-4 items-start">
                  <div className="min-w-[48px] h-12 rounded-lg bg-primary flex flex-col items-center justify-center text-white">
                    <span className="text-[10px] uppercase">{e.month.replace('月','')}月</span>
                    <span className="text-lg font-extrabold leading-none">{e.day}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{e.title}</h4>
                    <p className="text-xs text-dim mt-0.5">{e.desc}</p>
                    <span className="tag mt-1.5">{e.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
