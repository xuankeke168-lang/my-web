/**
 * Power BI PL-300 互动题库 - 类型定义
 *
 * 题目来源于「PowerBI_PL300_认证学习系统_互动题库.html」，
 * 全部 270 道题原文未精简，按 PL-300 官方技能域整理。
 */

export type Difficulty = "初级" | "中级" | "高级";

export interface Question {
  /** 题目序号 */
  id: number;
  /** 所属模块（数据准备 / 数据建模与 DAX / 可视化与报表 / 部署与安全 / 综合实战模拟） */
  module: string;
  /** 考点 / 技能点 */
  skill: string;
  /** 难度 */
  difficulty: Difficulty;
  /** 题干 */
  question: string;
  /** 选项（A/B/C/D...） */
  options: string[];
  /** 正确答案：选项字母 */
  answer: string;
  /** 答案解析 */
  explanation: string;
  /** 实战练习提示 */
  practice: string;
}

/** 训练模式 */
export type QuizMode = "all" | "random" | "wrong" | "fav";

/** 单题答题状态 */
export interface AnswerRecord {
  /** 选了什么 */
  selected: string;
  /** 是否正确 */
  correct: boolean;
}
