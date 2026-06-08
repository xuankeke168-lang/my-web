import Link from "next/link";
import Pl300Quiz from "./quiz";
import {
  difficultyCounts,
  moduleCounts,
  modules,
  totalQuestions,
} from "@/data/pl300/questions";

export const metadata = {
  title: "Power BI PL-300 互动题库 - AI学院",
  description:
    "270 道 PL-300 考点训练题，覆盖数据准备 / 数据建模与 DAX / 可视化与报表 / 部署与安全 / 综合实战模拟 5 大模块，支持章节训练、随机 60 题、错题本、收藏与本地进度持久化。",
};

export default function Pl300QuizPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {/* 顶部导航 */}
        <div className="mb-4 flex items-center justify-between text-sm">
          <Link
            href="/academy"
            className="text-zinc-500 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400"
          >
            ← 返回AI学院
          </Link>
          <span className="text-[11px] text-zinc-400 dark:text-zinc-600">
            全部题库 {totalQuestions} 道
          </span>
        </div>

        {/* 入口简介卡（仅在 client 组件挂载前显示，结构简短） */}
        <noscript>
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            本模块为客户端互动题库，需要启用 JavaScript 才能作答。
          </div>
        </noscript>

        <Pl300Quiz />

        {/* 免责声明 */}
        <p className="mt-10 text-center text-xs text-zinc-400 dark:text-zinc-600">
          题目依据 PL-300
          官方技能域整理，并非考试原题泄露。进度保存在本机浏览器中（localStorage）。
        </p>
      </div>
    </div>
  );
}

/** 模块分布概览（仅在 build 时静态计算） */
export const moduleSummary = (() => {
  const total = totalQuestions;
  return {
    total,
    modules: modules.map((m) => ({
      name: m,
      count: moduleCounts[m] ?? 0,
      percent:
        total > 0 && moduleCounts[m]
          ? Math.round((moduleCounts[m] / total) * 100)
          : 0,
    })),
    difficulty: difficultyCounts,
  };
})();
