"""
把 F:\\yecaironghe\\Meta_Kim\\业财融合知识库\\topics\\ 下的 HTML 文件解析为结构化 TS 数据块数组。
供 src/app/academy/yecai/[slug]/page.tsx 渲染使用。

设计目标：
1. 不精简：保留所有段落、列表、表格、引用、代码、特殊盒子的文本
2. 块结构：h2/h3/h4、p、ul/ol、table、blockquote、pre、key_point/finance_box/case_box
3. inline 标签：p/li/td 内允许 <strong> <em> <code>，原样保留
"""

import os
import re
import json
from pathlib import Path
from bs4 import BeautifulSoup, NavigableString, Tag

# ============== 路径配置 ==============
SOURCE_DIR = Path(r"F:\yecaironghe\Meta_Kim\业财融合知识库\topics")
OUT_DIR = Path(r"E:\work\my-portfolio\src\data\yecai")
OUT_DIR.mkdir(parents=True, exist_ok=True)

# ============== slug 映射 ==============
# 文件名 -> slug 映射（与 src/lib/finance-biz.ts 一致）
SLUG_MAP = {
    "01-钻井工程管理与成本控制.html": "zuanjing-guanli",
    "02-采油工程与生产管理.html": "caiyou-guanli",
    "03-油气集输与处理工艺.html": "qiyou-jishu",
    "04-油田设备管理与折旧策略.html": "shebei-guanli",
    "05-油田安全环保管理.html": "anquan-huanjing",
    "06-油气勘探技术与管理.html": "tanqiu-jishu",
    "07-油气储量资产管理.html": "chuliang-zichan",
    "08-修井作业与井筒维护.html": "xiujing-zuoye",
    "09-油田注水开发与管理.html": "zhushui-kaifa",
    "10-稠油热采技术与管理.html": "chongyou-recai",
    "11-油田化学与提高采收率.html": "huaxue-caishoulv",
    "12-天然气开发与处理管理.html": "tianranqi-kaifa",
    "13-油田生产运行与调度管理.html": "shengchan-yunxing",
    "14-油田信息化建设与智能化.html": "xinxihua-jianhua",
    "16-油田人力资源与人工成本管理.html": "rengli-zhongjie",
    "17-油气资产减值与处置管理.html": "jianzhi-chuzhi",
    "18-油价风险管理与其他商品衍生品.html": "youjia-fengxian",
    "19-油气开发项目经济评价.html": "xiangmu-jingjipingjia",
    "20-塔河油田提高采收率技术.html": "tahe-caishoulv",
}


def inline_html(node) -> str:
    """
    把一个 Tag 的子节点（只保留 inline 标签）序列化为 HTML 字符串。
    保留 <strong> <em> <code> <a>，剥离其他标签。
    """
    if isinstance(node, NavigableString):
        return str(node)
    if not isinstance(node, Tag):
        return ""

    allowed = {"strong", "em", "code", "b", "i", "a", "br", "span", "u", "sub", "sup"}
    if node.name in allowed:
        # 递归处理子节点
        inner = "".join(inline_html(c) for c in node.children)
        if node.name == "br":
            return "<br/>"
        attrs = ""
        if node.name == "a" and node.get("href"):
            href = node["href"]
            # 跳过非本站 / javascript 等
            if href.startswith(("http", "https", "/", "#", "../")):
                attrs = f' href="{href}"'
        return f"<{node.name}{attrs}>{inner}</{node.name}>"
    # 其他标签：递归子节点，但不要 wrapper
    return "".join(inline_html(c) for c in node.children)


def parse_learning_info(node) -> dict | None:
    """解析 <div class="learning-info"> 块。"""
    meta_items = []
    for item in node.select(".learning-meta-item"):
        icon_el = item.select_one(".meta-icon")
        label_el = item.select_one(".meta-label")
        value_el = item.select_one(".meta-value")
        meta_items.append({
            "icon": icon_el.get_text(strip=True) if icon_el else "",
            "label": label_el.get_text(strip=True) if label_el else "",
            "value": value_el.get_text(strip=True) if value_el else "",
        })
    obj_ul = node.select_one(".learning-objectives ul")
    objectives = []
    if obj_ul:
        for li in obj_ul.find_all("li", recursive=False):
            objectives.append(inline_html(li))
    if not meta_items and not objectives:
        return None
    return {"type": "learning_info", "meta": meta_items, "objectives": objectives}


def parse_box(node, box_type: str) -> dict:
    """解析 key_point / finance_box / case_box。"""
    title = ""
    h4 = node.find(["h4", "h3"], recursive=True)
    if h4:
        title = h4.get_text(strip=True)
        h4.decompose()
    # 剩余所有内容合并为 HTML
    inner = "".join(inline_html(c) for c in node.children).strip()
    return {"type": box_type, "title": title, "html": inner}


def parse_table(node) -> dict:
    """解析 table。"""
    headers = []
    thead = node.find("thead")
    if thead:
        ths = thead.find_all("th")
        headers = [inline_html(th).strip() for th in ths]

    rows = []
    trs = node.find_all("tr")
    for tr in trs:
        # 跳过 thead 行
        if thead and tr.find_parent("thead") is thead:
            continue
        cells = tr.find_all(["td", "th"])
        cell_htmls = [inline_html(td).strip() for td in cells]
        # 跳过作为 headers 的首行 th
        if not headers and trs.index(tr) == 0:
            ths = tr.find_all("th")
            tds = tr.find_all("td")
            if ths and not tds:
                headers = [inline_html(th).strip() for th in ths]
                continue
        if cell_htmls:
            rows.append(cell_htmls)
    return {"type": "table", "headers": headers, "rows": rows}


def parse_article_header(node) -> dict:
    """解析 <div class="article-header">。"""
    title = ""
    h1 = node.find("h1")
    if h1:
        title = h1.get_text(strip=True)
    subtitle = ""
    sub = node.select_one(".subtitle")
    if sub:
        subtitle = sub.get_text(strip=True)
    meta = []
    for span in node.select(".article-meta span"):
        meta.append(span.get_text(strip=True))
    breadcrumb = ""
    bc = node.select_one(".breadcrumb")
    if bc:
        breadcrumb = bc.get_text(strip=True)
    return {
        "type": "header",
        "title": title,
        "subtitle": subtitle,
        "meta": meta,
        "breadcrumb": breadcrumb,
    }


def parse_article_nav(node) -> dict | None:
    """解析 <div class="article-nav">。"""
    prev_a = node.select_one("a.prev")
    next_a = node.select_one("a.next")
    prev_text = None
    prev_href = None
    if prev_a:
        style = prev_a.get("style", "")
        if "visibility:hidden" not in style and "visibility: hidden" not in style:
            prev_text = prev_a.get_text(strip=True)
            prev_href = prev_a.get("href")
    next_text = next_a.get_text(strip=True) if next_a else None
    next_href = next_a.get("href") if next_a else None
    return {
        "type": "article_nav",
        "prev": prev_text,
        "next": next_text,
        "prev_href": prev_href,
        "next_href": next_href,
    }


def parse_list(node) -> dict:
    """解析 ul/ol。"""
    tag = node.name  # "ul" or "ol"
    items = []
    for li in node.find_all("li", recursive=False):
        items.append(inline_html(li))
    return {"type": tag, "items": items}


def parse_blocks(html_path: Path) -> list[dict]:
    """主解析：把 HTML 转为块数组。

    容器优先级：
    1) <article>（包裹正文）
    2) <div class="container">（无 article 包裹时）
    """
    raw = html_path.read_text(encoding="utf-8")
    soup = BeautifulSoup(raw, "lxml")

    blocks: list[dict] = []

    # 优先找 article
    root = soup.find("article")
    if root is None:
        root = soup.find("div", class_="container")
    if root is None:
        return []

    def visit(node: Tag):
        """递归处理节点，对子元素分类为块。"""
        for child in list(node.children):
            if isinstance(child, NavigableString):
                txt = str(child).strip()
                if txt:
                    blocks.append({"type": "p", "html": txt})
                continue
            if not isinstance(child, Tag):
                continue

            classes = child.get("class", []) or []

            # 跳过 <script>、theme-toggle
            if child.name in ("script", "style", "button"):
                continue
            if "theme-toggle" in classes:
                continue

            # 匹配特殊块
            if "article-header" in classes:
                blocks.append(parse_article_header(child))
                continue
            if "learning-info" in classes:
                li = parse_learning_info(child)
                if li:
                    blocks.append(li)
                continue
            if "key-point" in classes:
                blocks.append(parse_box(child, "key_point"))
                continue
            if "finance-box" in classes:
                blocks.append(parse_box(child, "finance_box"))
                continue
            if "case-box" in classes:
                blocks.append(parse_box(child, "case_box"))
                continue
            if "article-nav" in classes or "navigation" in classes:
                nav = parse_article_nav(child)
                if nav and (nav.get("prev") or nav.get("next")):
                    blocks.append(nav)
                continue
            if "article-footer" in classes:
                inner = "".join(inline_html(c) for c in child.children).strip()
                if inner:
                    blocks.append({"type": "footer", "html": inner})
                continue
            if "back-link" in classes:
                continue
            # 跳过面包屑/导航标签
            if child.name in ("nav", "header", "footer") and not classes:
                # 可能是 article 外的导航；如果没有 classes，跳过
                continue
            if "breadcrumb" in classes:
                continue

            # 普通块
            if child.name in ("h2", "h3", "h4", "h5"):
                text = child.get_text(strip=True)
                if text:
                    blocks.append({"type": child.name, "text": text})
                continue
            if child.name == "p":
                html = inline_html(child).strip()
                if html:
                    blocks.append({"type": "p", "html": html})
                continue
            if child.name in ("ul", "ol"):
                parsed = parse_list(child)
                if parsed["items"]:
                    blocks.append(parsed)
                continue
            if child.name == "table":
                blocks.append(parse_table(child))
                continue
            if child.name == "blockquote":
                inner = "".join(inline_html(c) for c in child.children).strip()
                if inner:
                    blocks.append({"type": "blockquote", "html": inner})
                continue
            if child.name == "pre":
                text = child.get_text()
                if text.strip():
                    blocks.append({"type": "pre", "text": text})
                continue
            if child.name in ("div", "article", "section", "main"):
                # 递归处理容器
                visit(child)
                continue

    visit(root)
    return blocks


def blocks_to_ts(blocks: list[dict]) -> str:
    """把块数组序列化为 TS 字面量。"""
    lines = ["["]
    for i, b in enumerate(blocks):
        lines.append(f"  {json.dumps(b, ensure_ascii=False)}" + ("," if i < len(blocks) - 1 else ""))
    lines.append("];")
    return "\n".join(lines)


def write_topic(file_name: str, slug: str):
    src = SOURCE_DIR / file_name
    if not src.exists():
        print(f"[跳过] {file_name} 不存在")
        return False
    try:
        blocks = parse_blocks(src)
    except Exception as e:
        print(f"[失败] {file_name}: {e}")
        import traceback
        traceback.print_exc()
        return False

    out = OUT_DIR / f"{slug}.ts"
    var_name = "".join(part.capitalize() for part in slug.split("-")) + "Blocks"

    body = f"""// 自动生成 by scripts/parse-yecai-html.py
// 源文件: {file_name}
// 内容来源: F:\\yecaironghe\\Meta_Kim\\业财融合知识库\\topics\\{file_name}

import type {{ ContentBlock }} from "./types";

export const {var_name}: ContentBlock[] = {blocks_to_ts(blocks)};
"""
    out.write_text(body, encoding="utf-8")
    print(f"[OK] {file_name} -> {out.name} ({len(blocks)} blocks)")
    return True


def write_types_file():
    types_content = '''// 业财融合专题内容块类型定义

export type InlineHtml = string;

export type ContentBlock =
  | { type: "header"; title: string; subtitle: string; meta: string[]; breadcrumb: string }
  | { type: "learning_info"; meta: Array<{ icon: string; label: string; value: string }>; objectives: string[] }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "h4"; text: string }
  | { type: "p"; html: InlineHtml }
  | { type: "ul"; items: InlineHtml[] }
  | { type: "ol"; items: InlineHtml[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "blockquote"; html: InlineHtml }
  | { type: "pre"; text: string }
  | { type: "key_point"; title: string; html: InlineHtml }
  | { type: "finance_box"; title: string; html: InlineHtml }
  | { type: "case_box"; title: string; html: InlineHtml }
  | { type: "article_nav"; prev: string | null; next: string | null; prev_href: string | null; next_href: string | null }
  | { type: "footer"; html: InlineHtml };
'''
    (OUT_DIR / "types.ts").write_text(types_content, encoding="utf-8")
    print("[OK] types.ts 写入完成")


def write_index_file(slugs: list[str]):
    body_parts = ['// 自动生成 by scripts/parse-yecai-html.py\n\n']
    body_parts.append("import type { ContentBlock } from \"./types\";\n\n")
    for slug in slugs:
        var_name = "".join(part.capitalize() for part in slug.split("-")) + "Blocks"
        body_parts.append(f"import {{ {var_name} }} from \"./{slug}\";\n")
    body_parts.append("\nexport const yecaiBlocks: Record<string, ContentBlock[]> = {\n")
    for slug in slugs:
        var_name = "".join(part.capitalize() for part in slug.split("-")) + "Blocks"
        body_parts.append(f'  "{slug}": {var_name},\n')
    body_parts.append("};\n")
    (OUT_DIR / "index.ts").write_text("".join(body_parts), encoding="utf-8")
    print(f"[OK] index.ts 写入完成（{len(slugs)} topics）")


if __name__ == "__main__":
    write_types_file()
    slugs = []
    for file_name, slug in SLUG_MAP.items():
        ok = write_topic(file_name, slug)
        if ok:
            slugs.append(slug)
    write_index_file(slugs)
    print(f"\n完成。共生成 {len(slugs)} 个 topic。")
