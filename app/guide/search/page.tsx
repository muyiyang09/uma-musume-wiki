'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import Link from 'next/link';
import { searchAll } from '@/lib/data';

function SearchContent() {
  const params = useSearchParams();
  const q = params.get('q') || '';

  const results = useMemo(() => (q ? searchAll(q) : []), [q]);

  return (
    <div className="container-main py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-2">搜索结果</h1>
      {q && <p className="text-dim mb-6">搜索「{q}」，找到 {results.length} 条结果</p>}

      {!q && (
        <div className="text-center py-20 text-dim">
          <div className="text-5xl mb-4">🔍</div>
          <p>请在顶部搜索框输入关键词</p>
          <p className="text-sm mt-2">支持搜索：赛马娘名称、支援卡名称、攻略标题、跑法、距离等</p>
        </div>
      )}

      {q && results.length === 0 && (
        <div className="text-center py-20 text-dim">
          <div className="text-5xl mb-4">😕</div>
          <p>未找到与「{q}」相关的结果</p>
          <p className="text-sm mt-2">试试其他关键词，如"特别周""逃げ""因子"</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          {results.map((r,i) => (
            <Link key={i} href={r.href} className="card p-4 block group">
              <div className="flex items-start gap-3">
                <span className="tag shrink-0 mt-0.5">{r.type}</span>
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{r.title}</h3>
                  <p className="text-sm text-dim mt-1">{r.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container-main py-20 text-center text-dim">搜索中...</div>}>
      <SearchContent />
    </Suspense>
  );
}
