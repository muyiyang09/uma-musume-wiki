'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [q, setQ] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) router.push(`/guide/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-md border-b border-border">
      <div className="container-main flex items-center h-14 gap-4 sm:gap-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-extrabold text-primary whitespace-nowrap hover:no-underline">
          <span className="text-2xl">🐎</span>
          <span>Uma<span className="text-gray-200">Trainer</span></span>
        </Link>

        <nav className="hidden md:flex gap-1">
          <Link href="/" className="px-3 py-1.5 rounded-md text-sm text-dim hover:text-white hover:bg-bg-card transition-colors">首页</Link>
          <Link href="/game/uma-musume" className="px-3 py-1.5 rounded-md text-sm text-dim hover:text-white hover:bg-bg-card transition-colors">赛马娘</Link>
          <Link href="/guide/tier-list" className="px-3 py-1.5 rounded-md text-sm text-dim hover:text-white hover:bg-bg-card transition-colors">Tier排行</Link>
          <Link href="/guide/training-guide" className="px-3 py-1.5 rounded-md text-sm text-dim hover:text-white hover:bg-bg-card transition-colors">育成攻略</Link>
          <Link href="/donate" className="px-3 py-1.5 rounded-md text-sm text-gold hover:text-white hover:bg-bg-card transition-colors">支持作者</Link>
        </nav>

        <form onSubmit={handleSearch} className="flex-1 max-w-sm ml-auto relative">
          <input
            type="text" value={q} onChange={e => setQ(e.target.value)}
            placeholder="搜索赛马娘、攻略、支援卡..."
            className="w-full pl-4 pr-10 py-2 rounded-full bg-bg-card border border-border
                       text-sm text-gray-200 placeholder-dim outline-none
                       focus:border-primary transition-colors"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-dim hover:text-primary transition-colors">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"/>
            </svg>
          </button>
        </form>
      </div>
    </header>
  );
}
