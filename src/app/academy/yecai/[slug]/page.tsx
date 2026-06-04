import { notFound } from "next/navigation";
import Link from "next/link";
import YecaiRenderer from "./render";
import { yecaiBlocks } from "@/data/yecai";
import { topics } from "@/lib/finance-biz";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(yecaiBlocks).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const topic = topics.find((t) => t.slug === slug);
  if (!topic) return { title: "Not Found" };
  return {
    title: `${topic.title} - 业财融合知识库（完整版）`,
    description: topic.subtitle,
  };
}

export default async function YecaiTopicPage({ params }: PageProps) {
  const { slug } = await params;
  const blocks = yecaiBlocks[slug];
  if (!blocks) notFound();

  const topic = topics.find((t) => t.slug === slug);
  if (!topic) notFound();

  const currentIndex = topics.findIndex((t) => t.slug === slug);
  const prevTopic = currentIndex > 0 ? topics[currentIndex - 1] : null;
  const nextTopic =
    currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null;
  const hasPrevWithContent = prevTopic
    ? Boolean(yecaiBlocks[prevTopic.slug])
    : false;
  const hasNextWithContent = nextTopic
    ? Boolean(yecaiBlocks[nextTopic.slug])
    : false;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* 顶部导航 */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 text-sm">
          <Link
            href="/academy/yecai"
            className="inline-flex items-center text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400"
          >
            ← 返回业财融合知识库
          </Link>
          <Link
            href="/academy"
            className="text-zinc-500 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400"
          >
            AI学院首页
          </Link>
        </div>

        {/* 元信息卡片（仅在文章头之外显示一份） */}
        <div className="mb-6 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 flex flex-wrap items-center gap-3">
          <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-mono font-semibold">
            专题 {topic.id} / {topics.length}
          </span>
          <span className="text-sm font-semibold text-zinc-900 dark:text-white">
            {topic.title}
          </span>
          <span className="text-zinc-300 dark:text-zinc-600">·</span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {topic.module} {topic.moduleIcon}
          </span>
          <span className="ml-auto flex flex-wrap gap-1.5">
            {topic.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
              >
                #{t}
              </span>
            ))}
          </span>
        </div>

        {/* 正文（来自解析后的结构化数据） */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 p-5 md:p-8">
          <YecaiRenderer blocks={blocks} />
        </div>

        {/* 底部上下页导航 */}
        <nav className="mt-8 flex flex-col sm:flex-row gap-3 justify-between">
          {hasPrevWithContent && prevTopic ? (
            <Link
              href={`/academy/yecai/${prevTopic.slug}`}
              className="text-sm px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:border-blue-400 dark:hover:border-blue-600 transition-colors flex-1"
            >
              ← 专题{prevTopic.id}：{prevTopic.title}
            </Link>
          ) : (
            <span className="flex-1" />
          )}
          {hasNextWithContent && nextTopic ? (
            <Link
              href={`/academy/yecai/${nextTopic.slug}`}
              className="text-sm px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:border-blue-400 dark:hover:border-blue-600 transition-colors flex-1 text-right"
            >
              专题{nextTopic.id}：{nextTopic.title} →
            </Link>
          ) : (
            <span className="flex-1" />
          )}
        </nav>

        {/* 免责声明 */}
        <p className="mt-8 text-center text-xs text-zinc-400 dark:text-zinc-600">
          本页内容整合自《业财融合知识库》专题培训材料，原文未经精简。
        </p>
      </div>
    </div>
  );
}
