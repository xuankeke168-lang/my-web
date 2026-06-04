import Link from "next/link";
import { topics, modules } from "@/lib/finance-biz";
import { yecaiBlocks } from "@/data/yecai";

export const metadata = {
  title: "业财融合知识库（完整版） - AI学院",
  description:
    "把油气开采业务全流程整合进 AI 学院，钻井·采油·集输·设备·HSE·勘探·储量·修井·注水·稠油·化学驱·天然气·调度·信息化·人力·减值·油价·项目评价·塔河实践等 19 个完整专题，原文未精简。",
};

interface Topic {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  tags: string[];
  module: string;
  moduleIcon: string;
}

export default function YecaiIndex() {
  // 只展示实际有完整 HTML 内容的 topic
  const available = topics.filter((t) => Boolean(yecaiBlocks[t.slug]));
  const grouped = modules.map((m) => ({
    ...m,
    topics: available.filter((t) => t.module === m.name),
  }));

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* 顶部导航 */}
        <div className="mb-6">
          <Link
            href="/academy"
            className="text-sm text-zinc-500 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400"
          >
            ← 返回AI学院
          </Link>
        </div>

        {/* 头部 */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
            <span>📊</span>
            <span>业财融合 · 完整版</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-3">
            油气开采业财融合知识库
          </h1>
          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-3xl leading-7">
            19
            个完整专题，覆盖钻井、采油、集输、设备、安全环保、勘探、储量、修井、注水、稠油热采、化学驱、天然气、调度、信息化、人力、减值、油价、项目评价与塔河实践。
            正文来自《业财融合知识库》原始培训材料，
            <strong className="text-zinc-900 dark:text-white">未经精简</strong>
            。
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-500 dark:text-zinc-500">
            <span className="px-3 py-1 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              {available.length} 个专题
            </span>
            <span className="px-3 py-1 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              {modules.length} 个业务模块
            </span>
            <span className="px-3 py-1 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              原文未精简
            </span>
          </div>
        </header>

        {/* 模块分组列表 */}
        <div className="space-y-10">
          {grouped.map((m) => (
            <section key={m.name}>
              <div className="flex items-center gap-3 mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-700">
                <span className="text-2xl">{m.icon}</span>
                <h2 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white">
                  {m.name}
                </h2>
                <span className="text-sm text-zinc-400 dark:text-zinc-600">
                  ({m.topics.length})
                </span>
              </div>

              {m.topics.length === 0 ? (
                <p className="text-sm text-zinc-400 dark:text-zinc-600 italic">
                  该模块暂无完整专题
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {m.topics.map((t) => (
                    <TopicCard key={t.id} topic={t} />
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function TopicCard({ topic }: { topic: Topic }) {
  return (
    <Link
      href={`/academy/yecai/${topic.slug}`}
      className="group block p-5 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-mono font-semibold">
          专题{topic.id}
        </span>
        <h3 className="text-base font-semibold text-zinc-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
          {topic.title}
        </h3>
      </div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3 line-clamp-2">
        {topic.subtitle}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {topic.tags.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
          >
            #{t}
          </span>
        ))}
      </div>
    </Link>
  );
}
