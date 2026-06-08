#!/usr/bin/env python3
"""
parse-pl300-html.py

从「PowerBI_PL300_认证学习系统_互动题库.html」抽取 const QUESTIONS=[...] 数组，
转储为 src/data/pl300-questions.json（UTF-8、原题未精简）。

用法：
    python scripts/parse-pl300-html.py <源 HTML 路径>

输出：
    src/data/pl300-questions.json
    同时在 stdout 打印题数 / 模块分布 / 难度分布摘要。

依赖：仅标准库。
"""
from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path
from typing import Any


HTML_QUESTION_RE = re.compile(r"const\s+QUESTIONS\s*=\s*(\[.*?\])\s*;", re.DOTALL)


def extract_questions(html_text: str) -> list[dict[str, Any]]:
    """从 HTML 文本里提取题目 JSON 数组。"""
    match = HTML_QUESTION_RE.search(html_text)
    if not match:
        raise ValueError("在源 HTML 中未找到 `const QUESTIONS = [...]` 块。")
    raw = match.group(1)
    # 容错：去除可能的尾部逗号（源 HTML 已验证无此问题）
    raw = re.sub(r",\s*]", "]", raw)
    return json.loads(raw)


def summarize(questions: list[dict[str, Any]]) -> str:
    """输出可读的题库摘要。"""
    total = len(questions)
    module_counts: dict[str, int] = {}
    difficulty_counts: dict[str, int] = {"初级": 0, "中级": 0, "高级": 0}
    for q in questions:
        module_counts[q["module"]] = module_counts.get(q["module"], 0) + 1
        diff = q.get("difficulty")
        if diff in difficulty_counts:
            difficulty_counts[diff] += 1
    lines = [f"总题数: {total}", "模块分布:"]
    for m, c in sorted(module_counts.items(), key=lambda x: -x[1]):
        lines.append(f"  - {m}: {c}")
    lines.append("难度分布:")
    for d, c in difficulty_counts.items():
        lines.append(f"  - {d}: {c}")
    return "\n".join(lines)


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__)
        return 1
    src_path = Path(sys.argv[1])
    if not src_path.exists():
        print(f"源文件不存在: {src_path}", file=sys.stderr)
        return 1
    html_text = src_path.read_text(encoding="utf-8")
    data = extract_questions(html_text)

    # 输出路径：项目根/src/data/pl300-questions.json
    project_root = Path(__file__).resolve().parent.parent
    out_path = project_root / "src" / "data" / "pl300-questions.json"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(
        json.dumps(data, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(summarize(data))
    print(f"\n已写入: {out_path}  ({os.path.getsize(out_path)} bytes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
