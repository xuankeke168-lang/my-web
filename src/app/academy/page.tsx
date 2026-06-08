import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function Academy() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            AI学院
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            AI学习路径、实战教程、经验分享，从入门到精通
          </p>
        </div>

        {/* 学习专区入口 */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
            📚 学习专区
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ERP学习专区 */}
            <Link
              href="/erp"
              className="group p-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl text-white hover:shadow-xl transition-all"
            >
              <div className="text-3xl mb-3">🏭</div>
              <h3 className="text-xl font-bold mb-2">油田ERP学习站</h3>
              <p className="text-blue-100 text-sm mb-4">
                系统学习SAP ERP各大模块：FI/CO/SD/PP/PM/MM/PS/QM/EHS
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-white/20 rounded-full">
                  10大模块
                </span>
                <span className="px-2 py-1 bg-white/20 rounded-full">
                  核心逻辑
                </span>
                <span className="px-2 py-1 bg-white/20 rounded-full">
                  术语表
                </span>
              </div>
            </Link>

            {/* 业财融合知识库（完整版） */}
            <Link
              href="/academy/yecai"
              className="group p-6 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl text-white hover:shadow-xl transition-all"
            >
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-xl font-bold mb-2">
                油气开采业财融合知识库（完整版）
              </h3>
              <p className="text-emerald-100 text-sm mb-4">
                19 个完整专题 · 原文未精简 · 覆盖钻井至销售全流程
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-white/20 rounded-full">
                  19个完整专题
                </span>
                <span className="px-2 py-1 bg-white/20 rounded-full">
                  原文未精简
                </span>
                <span className="px-2 py-1 bg-white/20 rounded-full">
                  案例+表格
                </span>
              </div>
            </Link>

            {/* Power BI PL-300 互动题库 */}
            <Link
              href="/academy/pl300-quiz"
              className="group p-6 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl text-white hover:shadow-xl transition-all"
            >
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-xl font-bold mb-2">
                Power BI PL-300 互动题库
              </h3>
              <p className="text-indigo-100 text-sm mb-4">
                270 道考点训练题 · 5 大模块 · 章节/随机/错题/收藏四模式 ·
                本机进度持久化
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-white/20 rounded-full">
                  270道题
                </span>
                <span className="px-2 py-1 bg-white/20 rounded-full">
                  5大模块
                </span>
                <span className="px-2 py-1 bg-white/20 rounded-full">
                  错题本
                </span>
                <span className="px-2 py-1 bg-white/20 rounded-full">收藏</span>
              </div>
            </Link>
          </div>
        </div>

        {/* AI学习文章 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6">
            📝 AI与财务数字化文章
          </h2>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/academy/${post.slug}`}
              className="block p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  {post.category}
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-500">
                  {post.date}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                {post.title}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
