r"""
赛马娘攻略自动爬虫 v2
数据源: GameWith 日服最新攻略
用法: python crawl_guides.py
"""
import requests
from bs4 import BeautifulSoup
import re
import json
import os
from datetime import datetime

OUTPUT_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "next-app", "lib", "external-guides.ts")
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Accept-Language": "ja,zh-CN;q=0.9",
}


def crawl_gamewith():
    """爬取 GameWith 最新攻略，通过 CSS 选择器找带日期的文章卡片"""
    try:
        r = requests.get("https://gamewith.jp/uma-musume", headers=HEADERS, timeout=20)
        if r.status_code != 200:
            print(f"[GameWith] HTTP {r.status_code}")
            return []
    except Exception as e:
        print(f"[GameWith] Request error: {e}")
        return []

    soup = BeautifulSoup(r.text, "html.parser")
    results = []
    seen_urls = set()

    date_pattern = re.compile(r"(\d{4})年(\d{1,2})月(\d{1,2})日")

    for a in soup.select("a[href*='/uma-musume/article/show/']"):
        href = a.get("href", "")
        article_id_match = re.search(r"/article/show/(\d+)", href)
        if not article_id_match:
            continue
        article_id = article_id_match.group(1)

        if article_id in seen_urls:
            continue

        title = a.get_text(strip=True)
        if not title or len(title) < 4:
            continue

        date_str = None
        parent = a
        for _ in range(5):
            parent = parent.parent
            if parent is None:
                break
            parent_text = parent.get_text()
            dm = date_pattern.search(parent_text)
            if dm:
                date_str = f"{dm.group(1)}-{dm.group(2).zfill(2)}-{dm.group(3).zfill(2)}"
                break

        nav_keywords = [
            "選択肢", "掲示板", "フレンド", "リセマラ", "一覧", "シミュ",
            "チェッカー", "計算", "交換", "比較", "最強", "キャラ一覧",
            "サポカ一覧", "サポカ比較", "新シナリオ", "速報まとめ", "コラム記事",
            "イベント一覧", "育成論一覧", "スキル一覧",
        ]
        if any(kw in title for kw in nav_keywords):
            continue
        # 标题太短且不含角色名括号的模式
        if len(title) <= 4 or (len(title) <= 6 and "(" not in title and "（" not in title):
            continue

        seen_urls.add(article_id)

        full_url = f"https://gamewith.jp{href}" if href.startswith("/") else href
        results.append({
            "title": title,
            "url": full_url,
            "source": "GameWith",
            "snippet": "",
            "date": date_str,
            "tags": [],
        })

    def sort_key(item):
        d = item.get("date") or "0000-00-00"
        return d
    results.sort(key=sort_key, reverse=True)
    results = results[:10]

    print(f"[GameWith] Crawled {len(results)} articles with dates")
    return results


def enrich_details(items):
    """抓取详情页补充摘要和缺失的日期"""
    for item in items[:8]:
        if item.get("snippet") and item.get("date"):
            continue
        try:
            r = requests.get(item["url"], headers=HEADERS, timeout=12)
            if r.status_code != 200:
                continue

            if not item.get("date"):
                dm = re.search(r"(\d{4})年(\d{1,2})月(\d{1,2})日", r.text[:3000])
                if dm:
                    item["date"] = f"{dm.group(1)}-{dm.group(2).zfill(2)}-{dm.group(3).zfill(2)}"

            soup = BeautifulSoup(r.text, "html.parser")
            if not item.get("snippet"):
                meta = soup.find("meta", attrs={"name": "description"})
                if meta and meta.get("content"):
                    item["snippet"] = meta["content"][:150]
                else:
                    p = soup.find("p")
                    if p:
                        text = p.get_text(strip=True)[:150]
                        if len(text) > 20:
                            item["snippet"] = text

            print(f"  [OK] {item['title'][:35]}... | date={item.get('date')}")
        except Exception as e:
            print(f"  [ERR] {item['title'][:25]}: {e}")

    return items


def generate_ts(items):
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    lines = [
        "// ====== External guides aggregator (auto-generated) ======",
        f"// Last crawl: {now}",
        "// Source: GameWith (gamewith.jp/uma-musume)",
        "",
        "export interface ExternalGuide {",
        "  title: string;",
        "  url: string;",
        "  source: string;",
        "  snippet: string;",
        "  date: string;",
        "  tags: string[];",
        "}",
        "",
        "export const externalGuides: ExternalGuide[] = [",
    ]
    for item in items:
        t = json.dumps(item["title"], ensure_ascii=False)
        u = json.dumps(item["url"], ensure_ascii=False)
        s = json.dumps(item.get("snippet", ""), ensure_ascii=False)
        d = json.dumps(item.get("date") or "", ensure_ascii=False)
        tags = json.dumps(item.get("tags") or ["攻略"], ensure_ascii=False)
        source = json.dumps(item["source"], ensure_ascii=False)
        lines.append("  {")
        lines.append(f"    title: {t},")
        lines.append(f"    url: {u},")
        lines.append(f"    source: {source},")
        lines.append(f"    snippet: {s},")
        lines.append(f"    date: {d},")
        lines.append(f"    tags: {tags},")
        lines.append("  },")
    lines.append("];")
    lines.append("")
    return "\n".join(lines)


def main():
    print("=" * 50)
    print(f"UmaMusume Guide Crawler v2 - {datetime.now():%Y-%m-%d %H:%M:%S}")
    print("=" * 50)

    print("\n[1/2] Crawling GameWith article list...")
    items = crawl_gamewith()

    if items:
        print(f"\n[2/2] Enriching {len(items)} articles from detail pages...")
        items = enrich_details(items)

    if not items:
        print("\n[!] No articles found. Keeping existing data.")
        return

    ts_content = generate_ts(items)
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write(ts_content)

    print(f"\n{'='*50}")
    print(f"[DONE] {OUTPUT_PATH}")
    print(f"       {len(items)} external guides written")
    for i, item in enumerate(items):
        print(f"       {i+1}. [{item.get('date','N/A')}] {item['title'][:55]}")


if __name__ == "__main__":
    main()
