import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-alt mt-16">
      <div className="container-main py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-sm font-semibold mb-3">UmaTrainer</h4>
            <p className="text-xs text-dim leading-relaxed">赛马娘 Pretty Derby<br/>中文育成攻略 Wiki</p>
            <p className="text-xs text-dim mt-2">非官方玩家社区项目</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">快捷导航</h4>
            <div className="flex flex-col gap-2 text-xs">
              <Link href="/guide/beginner-guide" className="text-dim hover:text-primary transition-colors">新手上路</Link>
              <Link href="/guide/tier-list" className="text-dim hover:text-primary transition-colors">Tier 排行</Link>
              <Link href="/guide/training-guide" className="text-dim hover:text-primary transition-colors">育成攻略</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">数据参考</h4>
            <div className="flex flex-col gap-2 text-xs">
              <a href="https://gamewith.jp/uma-musume/" target="_blank" rel="noopener" className="text-dim hover:text-primary transition-colors">GameWith</a>
              <a href="https://kamigame.jp/umamusume/" target="_blank" rel="noopener" className="text-dim hover:text-primary transition-colors">Kamigame</a>
              <a href="https://bbs.nga.cn/thread.php?fid=-34644324" target="_blank" rel="noopener" className="text-dim hover:text-primary transition-colors">NGA论坛</a>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-6 text-center text-xs text-dim">
          <p>本网站与 Cygames 无关联。游戏内图像与名称归 Cygames 所有。</p>
        </div>
      </div>
    </footer>
  );
}
