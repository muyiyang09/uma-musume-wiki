'use client';

export default function DonatePage() {
  return (
    <div className="container-main py-16 max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold mb-3">支持作者</h1>
        <p className="text-dim">如果本站攻略对你有帮助，欢迎请作者喝杯咖啡</p>
      </div>

      <div className="grid gap-6">
        {/* 爱发电 */}
        <div className="card p-8 text-center">
          <h2 className="text-xl font-bold mb-2 text-primary">爱发电</h2>
          <p className="text-sm text-dim mb-4">每月赞助，支持持续更新</p>
          <a
            href="https://afdian.com/a/muyiyang09"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            前往爱发电赞助
          </a>
        </div>

        {/* 打赏码 */}
        <div className="card p-8 text-center">
          <h2 className="text-xl font-bold mb-2 text-primary">扫码打赏</h2>
          <p className="text-sm text-dim mb-6">微信 / 支付宝 扫码即可</p>
          <div className="w-56 h-56 mx-auto rounded-xl overflow-hidden border border-border">
            <img src="/qrcode-donate.jpg" alt="打赏码" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* GitHub Sponsor */}
        <div className="card p-8 text-center">
          <h2 className="text-xl font-bold mb-2 text-primary">GitHub Sponsor</h2>
          <p className="text-sm text-dim mb-4">通过 GitHub Sponsors 支持开发者</p>
          <a
            href="https://github.com/sponsors/muyiyang09"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub Sponsor
          </a>
        </div>
      </div>
    </div>
  );
}
