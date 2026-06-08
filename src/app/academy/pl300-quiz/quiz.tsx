/**
 * Power BI PL-300 互动题库 - 主组件
 *
 * 原 HTML 来源：「PowerBI_PL300_认证学习系统_互动题库.html」
 * 保留全部交互能力：章节训练 / 随机60题 / 错题本 / 收藏题 /
 * 难度&模块筛选 / 答题反馈 / 进度条 / 统计。
 * 错题本与收藏用 localStorage 持久化。
 */
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  difficulties,
  difficultyCounts,
  moduleCounts,
  modules,
  questions,
  totalQuestions,
} from "@/data/pl300/questions";
import type {
  AnswerRecord,
  Difficulty,
  Question,
  QuizMode,
} from "@/data/pl300/types";

const STORAGE_KEY = "pl300-quiz-state-v1";
const RANDOM_COUNT = 60;

interface PersistedState {
  favorites: number[];
  wrongIds: number[];
  answered: Record<number, AnswerRecord>;
}

function loadState(): PersistedState {
  if (typeof window === "undefined") {
    return { favorites: [], wrongIds: [], answered: {} };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { favorites: [], wrongIds: [], answered: {} };
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return {
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
      wrongIds: Array.isArray(parsed.wrongIds) ? parsed.wrongIds : [],
      answered:
        parsed.answered && typeof parsed.answered === "object"
          ? parsed.answered
          : {},
    };
  } catch {
    return { favorites: [], wrongIds: [], answered: {} };
  }
}

function saveState(state: PersistedState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota / privacy mode errors
  }
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function optionLetter(index: number): string {
  return String.fromCharCode(65 + index);
}

export default function Pl300Quiz() {
  const [hydrated, setHydrated] = useState(false);
  const [mode, setMode] = useState<QuizMode>("all");
  const [moduleFilter, setModuleFilter] = useState<string>("");
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "">("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [wrongIds, setWrongIds] = useState<number[]>([]);
  const [answered, setAnswered] = useState<Record<number, AnswerRecord>>({});
  const [randomSet, setRandomSet] = useState<number[] | null>(null);

  // 客户端水合后从 localStorage 读
  useEffect(() => {
    const s = loadState();
    setFavorites(s.favorites);
    setWrongIds(s.wrongIds);
    setAnswered(s.answered);
    setHydrated(true);
  }, []);

  // 持久化
  useEffect(() => {
    if (!hydrated) return;
    saveState({ favorites, wrongIds, answered });
  }, [hydrated, favorites, wrongIds, answered]);

  // 当前题目池
  const currentPool: Question[] = useMemo(() => {
    if (mode === "random") {
      if (randomSet && randomSet.length > 0) {
        const set = new Set(randomSet);
        return questions.filter((q) => set.has(q.id));
      }
      return shuffle(questions).slice(0, RANDOM_COUNT);
    }
    if (mode === "wrong") {
      const set = new Set(wrongIds);
      return questions.filter((q) => set.has(q.id));
    }
    if (mode === "fav") {
      const set = new Set(favorites);
      return questions.filter((q) => set.has(q.id));
    }
    return questions;
  }, [mode, randomSet, wrongIds, favorites]);

  // 应用筛选（模块 / 难度）
  const visibleQuestions: Question[] = useMemo(() => {
    return currentPool.filter((q) => {
      if (moduleFilter && q.module !== moduleFilter) return false;
      if (difficultyFilter && q.difficulty !== difficultyFilter) return false;
      return true;
    });
  }, [currentPool, moduleFilter, difficultyFilter]);

  // 统计
  const stats = useMemo(() => {
    const done = visibleQuestions.filter((q) => answered[q.id]).length;
    const right = visibleQuestions.filter(
      (q) => answered[q.id]?.correct === true,
    ).length;
    const rate = done > 0 ? Math.round((right / done) * 100) : 0;
    return {
      total: visibleQuestions.length,
      done,
      right,
      rate,
    };
  }, [visibleQuestions, answered]);

  const progressPercent =
    stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

  // 切模式
  const switchMode = useCallback((next: QuizMode) => {
    setMode(next);
    if (next === "random") {
      setRandomSet(
        shuffle(questions)
          .slice(0, RANDOM_COUNT)
          .map((q) => q.id),
      );
    } else {
      setRandomSet(null);
    }
  }, []);

  const resetSession = useCallback(() => {
    if (typeof window !== "undefined") {
      const ok = window.confirm("确认重置本次进度？（不会清空收藏与错题本）");
      if (!ok) return;
    }
    setAnswered({});
  }, []);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const handleSelect = useCallback(
    (q: Question, letter: string) => {
      if (answered[q.id]) return; // 已答过
      const correct = letter === q.answer;
      setAnswered((prev) => ({
        ...prev,
        [q.id]: { selected: letter, correct },
      }));
      if (!correct) {
        setWrongIds((prev) => (prev.includes(q.id) ? prev : [...prev, q.id]));
      } else {
        setWrongIds((prev) => prev.filter((x) => x !== q.id));
      }
    },
    [answered],
  );

  return (
    <div className="space-y-4">
      {/* 头部：标题 + 进度条 */}
      <header className="sticky top-0 z-20 -mx-4 sm:-mx-6 px-4 sm:px-6 py-4 bg-zinc-900 text-white">
        <h1 className="text-lg font-bold">Power BI PL-300 认证学习系统</h1>
        <p className="text-xs text-zinc-300 mt-1">
          考点训练 + 错题本 + 收藏 + 随机模拟。题目依据 PL-300 官方技能域整理，
          不是考试原题泄露。
        </p>
        <div className="mt-2 h-2 bg-zinc-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="mt-1 text-[11px] text-zinc-400 text-right tabular-nums">
          进度 {progressPercent}%（{stats.done}/{stats.total}）
        </div>
      </header>

      {/* 工具栏 */}
      <div className="sticky top-[112px] z-10 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 flex flex-wrap gap-2 overflow-x-auto">
        <select
          aria-label="模块筛选"
          value={moduleFilter}
          onChange={(e) => setModuleFilter(e.target.value)}
          className="text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white px-3 py-2 min-w-[140px]"
        >
          <option value="">全部模块</option>
          {modules.map((m) => (
            <option key={m} value={m}>
              {m}（{moduleCounts[m]}）
            </option>
          ))}
        </select>
        <select
          aria-label="难度筛选"
          value={difficultyFilter}
          onChange={(e) =>
            setDifficultyFilter(e.target.value as Difficulty | "")
          }
          className="text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white px-3 py-2 min-w-[120px]"
        >
          <option value="">全部难度</option>
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d}（{difficultyCounts[d]}）
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => switchMode("all")}
          className={`text-sm rounded-lg px-3 py-2 whitespace-nowrap ${
            mode === "all"
              ? "bg-blue-600 text-white"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200"
          }`}
        >
          章节训练
        </button>
        <button
          type="button"
          onClick={() => switchMode("random")}
          className={`text-sm rounded-lg px-3 py-2 whitespace-nowrap ${
            mode === "random"
              ? "bg-blue-600 text-white"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200"
          }`}
        >
          随机60题
        </button>
        <button
          type="button"
          onClick={() => switchMode("wrong")}
          className={`text-sm rounded-lg px-3 py-2 whitespace-nowrap ${
            mode === "wrong"
              ? "bg-rose-600 text-white"
              : "bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300"
          }`}
        >
          错题本
          {hydrated && wrongIds.length > 0 ? `（${wrongIds.length}）` : ""}
        </button>
        <button
          type="button"
          onClick={() => switchMode("fav")}
          className={`text-sm rounded-lg px-3 py-2 whitespace-nowrap ${
            mode === "fav"
              ? "bg-amber-500 text-white"
              : "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
          }`}
        >
          收藏题
          {hydrated && favorites.length > 0 ? `（${favorites.length}）` : ""}
        </button>
        <button
          type="button"
          onClick={resetSession}
          className="text-sm rounded-lg px-3 py-2 whitespace-nowrap bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
        >
          重置进度
        </button>
      </div>

      {/* 统计卡 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <StatBlock label="当前题数" value={stats.total} />
        <StatBlock label="已答" value={stats.done} />
        <StatBlock label="正确" value={stats.right} accent="emerald" />
        <StatBlock label="正确率" value={`${stats.rate}%`} accent="blue" />
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
        建议：先章节训练做到 85%+，再随机60题模拟；错题本清零后再预约考试。
      </p>

      <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
        全部题库 {totalQuestions} 道 · 当前模式：
        {mode === "all" && "章节训练"}
        {mode === "random" && `随机${RANDOM_COUNT}题`}
        {mode === "wrong" && "错题本"}
        {mode === "fav" && "收藏题"}
        {moduleFilter && ` · 模块：${moduleFilter}`}
        {difficultyFilter && ` · 难度：${difficultyFilter}`}
      </p>

      {/* 题目列表 */}
      <div className="space-y-3">
        {visibleQuestions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 p-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
            当前条件下没有题目。
            {mode === "wrong" && "（答错题目会自动收入错题本）"}
            {mode === "fav" && "（点击题目右上角的 ☆ 加入收藏）"}
          </div>
        ) : (
          visibleQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              record={answered[q.id]}
              isFav={favorites.includes(q.id)}
              onSelect={(letter) => handleSelect(q, letter)}
              onToggleFav={() => toggleFavorite(q.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

function StatBlock({
  label,
  value,
  accent,
}: {
  label: string;
  value: number | string;
  accent?: "emerald" | "blue";
}) {
  const valueClass =
    accent === "emerald"
      ? "text-emerald-600 dark:text-emerald-400"
      : accent === "blue"
        ? "text-blue-600 dark:text-blue-400"
        : "text-zinc-900 dark:text-white";
  return (
    <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 p-3 text-center">
      <div className={`text-xl font-bold tabular-nums ${valueClass}`}>
        {value}
      </div>
      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
        {label}
      </div>
    </div>
  );
}

function QuestionCard({
  question,
  record,
  isFav,
  onSelect,
  onToggleFav,
}: {
  question: Question;
  record?: AnswerRecord;
  isFav: boolean;
  onSelect: (letter: string) => void;
  onToggleFav: () => void;
}) {
  const answeredFlag = Boolean(record);
  return (
    <article className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 p-4 sm:p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2 mb-2 text-[11px] text-zinc-500 dark:text-zinc-400">
        <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-mono">
          #{question.id}
        </span>
        <span className="px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300">
          {question.module}
        </span>
        <span className="px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300">
          {question.skill}
        </span>
        <span
          className={`px-2 py-0.5 rounded-full ${
            question.difficulty === "初级"
              ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
              : question.difficulty === "中级"
                ? "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                : "bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300"
          }`}
        >
          {question.difficulty}
        </span>
        <button
          type="button"
          onClick={onToggleFav}
          aria-label={isFav ? "取消收藏" : "收藏题目"}
          className={`ml-auto text-base px-2 py-0.5 rounded-full border ${
            isFav
              ? "bg-amber-100 dark:bg-amber-900/40 border-amber-300 text-amber-700 dark:text-amber-200"
              : "bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-zinc-500 dark:text-zinc-400"
          }`}
        >
          {isFav ? "★ 已收藏" : "☆ 收藏"}
        </button>
      </div>

      <h3 className="text-base sm:text-lg font-semibold leading-relaxed text-zinc-900 dark:text-white mb-3">
        {question.question}
      </h3>

      <div className="space-y-2">
        {question.options.map((opt, i) => {
          const letter = optionLetter(i);
          const isSelected = record?.selected === letter;
          const isCorrect = letter === question.answer;
          let cls =
            "w-full text-left min-h-[44px] px-3 py-2.5 rounded-xl border text-sm sm:text-base leading-relaxed transition-colors ";
          if (answeredFlag) {
            if (isCorrect) {
              cls +=
                "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-400 text-emerald-900 dark:text-emerald-100";
            } else if (isSelected) {
              cls +=
                "bg-rose-50 dark:bg-rose-900/30 border-rose-400 text-rose-900 dark:text-rose-100";
            } else {
              cls +=
                "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400";
            }
          } else {
            cls +=
              "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/20";
          }
          return (
            <button
              key={letter}
              type="button"
              disabled={answeredFlag}
              onClick={() => onSelect(letter)}
              className={cls}
            >
              <span className="font-mono font-semibold mr-2">{letter}.</span>
              {opt}
            </button>
          );
        })}
      </div>

      {answeredFlag && (
        <div className="mt-3 border-l-4 border-blue-500 bg-blue-50/60 dark:bg-blue-900/20 rounded-r-lg p-3 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
          <div className="font-semibold text-blue-700 dark:text-blue-300 mb-1">
            {record?.correct
              ? "✅ 回答正确"
              : `❌ 回答错误（正确答案 ${question.answer}）`}
          </div>
          <p>
            <span className="font-semibold">解析：</span>
            {question.explanation}
          </p>
          <p className="mt-1">
            <span className="font-semibold">实战练习：</span>
            {question.practice}
          </p>
        </div>
      )}
    </article>
  );
}
