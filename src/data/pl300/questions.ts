/**
 * 全部 270 道 PL-300 题库数据（来自 pl300-questions.json）
 *
 * 注意：JSON 本身在仓库内（约 165KB），由 scripts/parse-pl300-html.py 从
 * 「PowerBI_PL300_认证学习系统_互动题库.html」抽取生成。题目原文未做精简。
 */
import type { Difficulty, Question } from "./types";
import rawQuestions from "@/data/pl300-questions.json";

export const questions: Question[] = rawQuestions as Question[];

/** 总题数 */
export const totalQuestions = questions.length;

/** 全部模块（按出现顺序去重） */
export const modules: string[] = Array.from(
  new Set(questions.map((q) => q.module)),
);

/** 各模块题数 */
export const moduleCounts: Record<string, number> = modules.reduce<
  Record<string, number>
>((acc, m) => {
  acc[m] = questions.filter((q) => q.module === m).length;
  return acc;
}, {});

/** 全部难度（按 初级 → 中级 → 高级 排序） */
export const difficulties: Difficulty[] = ["初级", "中级", "高级"];

/** 难度分布 */
export const difficultyCounts: Record<Difficulty, number> = {
  初级: questions.filter((q) => q.difficulty === "初级").length,
  中级: questions.filter((q) => q.difficulty === "中级").length,
  高级: questions.filter((q) => q.difficulty === "高级").length,
};
