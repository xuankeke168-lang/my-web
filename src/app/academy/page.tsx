import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function Academy() {
  const posts = getAllPosts();

  // 简单按 category 分组
  const groups: Record<string, typeof posts> = {};
  for (const post of posts) {
    if (!groups[post.category]) groups[post.category] = [];
    groups[post.category].push(post);
  }
  const categoryList = Object.keys(groups);

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-[var(--zinc-soft)] hover:text-[var(--ink)] link-underline mb-12"
        >
          ← 回到日记
        </Link>

        {/* Header */}
        <div className="mb-16">
          <div className="font-mono text-xs text-[var(--zinc-soft)] mb-4">
            #academy / 成长记录
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            成长记录
          </h1>
          <p className="text-lg text-[var(--ink-soft)] leading-relaxed">
            工具 · 学习 · 案例 · 感悟
            <br />
            一共 {posts.length} 篇，持续写。
          </p>
        </div>

        {/* 4 主线筛选 chip */}
        <div className="flex flex-wrap gap-2 mb-12 pb-8 border-b border-[var(--line)]">
          {["全部", "工具", "学习", "案例", "感悟"].map((tag) => {
            const isActive = tag === "全部";
            return (
              <button
                key={tag}
                className={`px-3 py-1.5 text-sm border transition-colors font-mono ${
                  isActive
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                    : "border-[var(--line)] hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* 文章列表（按分类分组） */}
        {categoryList.map((cat) => (
          <section key={cat} className="mb-16">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-2xl font-bold tracking-tight">{cat}</h2>
              <span className="font-mono text-xs text-[var(--zinc-soft)]">
                {groups[cat].length} 篇
              </span>
            </div>

            <div className="divide-y divide-[var(--line)] border-t border-b border-[var(--line)]">
              {groups[cat].map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/academy/${post.slug}`}
                  className="block py-5 hover:bg-[var(--ink)]/[0.02] transition-colors"
                >
                  <div className="grid md:grid-cols-12 gap-3 items-baseline">
                    <span className="md:col-span-1 font-mono text-xs text-[var(--amber)]">
                      {String(i + 1).padStart(3, "0")}
                    </span>
                    <span className="md:col-span-2 font-mono text-xs text-[var(--zinc-soft)]">
                      {post.date}
                    </span>
                    <span className="md:col-span-9 text-base font-medium hover:text-[var(--amber)] transition-colors">
                      {post.title}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
