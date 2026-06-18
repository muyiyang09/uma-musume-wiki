import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'UmaTrainer - 赛马娘攻略 Wiki',
    template: '%s | UmaTrainer',
  },
  description: '最全面的赛马娘育成攻略、支援卡推荐、角色图鉴、大赛资讯。图文攻略 + 配卡方案，助你快速养成最强赛马娘。',
  keywords: ['赛马娘', '攻略', '育成', '支援卡', '配卡', '因子', 'Tier排行', 'ウマ娘'],
  openGraph: {
    title: 'UmaTrainer - 赛马娘攻略 Wiki',
    description: '最全面的赛马娘育成攻略、支援卡推荐、角色图鉴',
    type: 'website',
    locale: 'zh_CN',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
