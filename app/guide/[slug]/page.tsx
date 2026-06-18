import fs from 'fs';
import path from 'path';
import { guides as guideMetas } from '@/lib/data';
import Link from 'next/link';

export function generateStaticParams() {
  return guideMetas.map(g => ({ slug: g.slug }));
}

// 简单的 frontmatter + markdown 解析
function parseMDX(filePath: string): { frontmatter: Record<string,string>; content: string } {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, content: raw };

  const frontmatter: Record<string,string> = {};
  match[1].split('\n').forEach(line => {
    const kv = line.match(/^(\w+):\s*(.+)$/);
    if (kv) frontmatter[kv[1]] = kv[2].replace(/^['"]|['"]$/g, '').trim();
  });

  return { frontmatter, content: match[2].trim() };
}

// 将简单 Markdown 转为 HTML 片段
function markdownToHtml(md: string): string {
  let html = md
    // 标题
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold mt-8 mb-3 text-primary-light">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-10 mb-4 pb-2 border-b border-border text-white">$1</h2>')
    // 粗体/斜体
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // 代码
    .replace(/`([^`]+)`/g, '<code class="bg-bg-alt px-1.5 py-0.5 rounded text-primary text-sm">$1</code>')
    // 引用
    .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-primary/50 pl-4 py-2 my-4 bg-bg-alt rounded-r-lg text-dim italic">$1</blockquote>')
    // 分割线
    .replace(/^---$/gm, '<hr class="my-8 border-border"/>')
    // 链接
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
    // 有序列表
    .replace(/^(\d+)\. (.+)$/gm, '<li class="text-gray-300 ml-5 list-decimal">$2</li>')
    // 无序列表
    .replace(/^\- (.+)$/gm, '<li class="text-gray-300 ml-5 list-disc">$2</li>')
    // 表格
    .replace(/^\|(.+)\|$/gm, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      const isHeader = match.includes('---');
      if (isHeader) return '';
      const tag = match === match.split('\n').find(l => l.includes('---'))?.split('\n')[0] ? 'th' : 'td';
      return '<tr>' + cells.map(c => `<${tag} class="p-3 border-b border-border text-sm ${tag==='th'?'text-dim font-semibold bg-bg-alt border-b-2':''}">${c.trim()}</${tag}>`).join('') + '</tr>';
    })
    // 段落
    .replace(/^(?!<[a-z]|$)(.+)$/gm, '<p class="mb-4 text-gray-300">$1</p>');

  // 包装表格
  html = html.replace(/(<tr>[\s\S]*?<\/tr>)+/g, (match) => {
    if (!match.includes('<th>')) return match;
    return `<table class="w-full mb-6 border-collapse"><thead>${match.split('</tr>')[0]}</tr></thead><tbody>${match.slice(match.indexOf('</tr>')+5)}</tbody></table>`;
  });

  // 包装列表项
  html = html.replace(/(<li class="text-gray-300 ml-5 list-(?:disc|decimal)">[^<]*<\/li>\n?)+/g, (match) => {
    const isOrdered = match.includes('list-decimal');
    return `<${isOrdered ? 'ol' : 'ul'} class="mb-4 space-y-1">${match}</${isOrdered ? 'ol' : 'ul'}>`;
  });

  return html;
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const meta = guideMetas.find(g => g.slug === params.slug);
  if (!meta) return <div className="container-main py-16 text-center text-dim">攻略未找到</div>;

  const filePath = path.join(process.cwd(), 'content', 'guides', `${params.slug}.mdx`);
  const { content } = parseMDX(filePath);
  const htmlContent = markdownToHtml(content);

  return (
    <article className="container-main py-8 max-w-3xl">
      {/* Breadcrumb */}
      <nav className="flex gap-2 text-sm text-dim mb-6">
        <Link href="/" className="hover:text-primary">首页</Link>
        <span>/</span>
        <Link href="/" className="hover:text-primary">攻略</Link>
        <span>/</span>
        <span className="text-gray-300">{meta.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="tag">{meta.category}</span>
          {meta.version && <span className="tag">{meta.version}</span>}
          {meta.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">{meta.title}</h1>
        <p className="text-dim text-lg mb-4">{meta.description}</p>
        <div className="flex items-center gap-4 text-sm text-dim">
          <span>{meta.author}</span>
          <span>更新于 {meta.date}</span>
        </div>
      </header>

      {/* Content */}
      <div
        className="prose-guide"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Related Guides */}
      <footer className="mt-16 pt-8 border-t border-border">
        <h3 className="text-lg font-bold mb-4">相关攻略</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {guideMetas.filter(g => g.slug !== params.slug).slice(0,4).map(g => (
            <Link key={g.slug} href={`/guide/${g.slug}`} className="card p-4 group">
              <span className="tag text-xs mb-2">{g.category}</span>
              <h4 className="text-sm font-semibold group-hover:text-primary transition-colors">{g.title}</h4>
            </Link>
          ))}
        </div>
      </footer>
    </article>
  );
}
