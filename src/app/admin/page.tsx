import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import StatCard from "@/components/admin/StatCard";
import RecentPostsTable from "@/components/admin/RecentPostsTable";
import AdminNav from "@/components/AdminNav";

export default async function AdminDashboard() {
  // 二次校验（middleware 已经过滤，但 page-level 是 defense in depth）
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login?callbackUrl=%2Fadmin");
  }
  const userLogin = (session.user as { login?: string } | undefined)?.login;
  if (userLogin !== "xuankeke168-lang") {
    redirect("/admin/login?error=Forbidden");
  }

  const posts = getAllPosts();
  const currentMonth = new Date().toISOString().slice(0, 7); // "2026-06"
  const monthCount = posts.filter((p) => p.date.startsWith(currentMonth)).length;
  const latest = posts[0];

  return (
    <>
      <AdminNav user={session!.user} />
      <main className="max-w-7xl mx-auto px-6 py-8 bg-zinc-50 dark:bg-black min-h-screen">
        <div className="space-y-8">
          {/* 欢迎 */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">
                仪表盘
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                欢迎回来，老板 · 今天也要好好学 AI
              </p>
            </div>
            <div className="text-right text-sm text-zinc-500 dark:text-zinc-500">
              <div>{new Date().toLocaleDateString("zh-CN")}</div>
              <div className="text-xs">第 {daysSinceStart()} 天</div>
            </div>
          </div>

          {/* 数据卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              label="文章总数"
              value={posts.length}
              unit="篇"
              icon="📝"
              trend={`+${monthCount} 本月`}
            />
            <StatCard
              label="本月新增"
              value={monthCount}
              unit="篇"
              icon="✨"
              trend="2026.06"
            />
            <StatCard
              label="主线分布"
              value={Object.entries(countByCategory(posts))
                .map(([k, v]) => `${k}·${v}`)
                .join("  ")
                .slice(0, 18) || "—"}
              icon="🎯"
              trend="工具/学习/案例/感悟"
              isText
            />
            <StatCard
              label="最新文章"
              value={latest?.title ?? "暂无"}
              icon="📰"
              trend={latest ? `更新于 ${latest.date}` : "—"}
              isText
            />
          </div>

          {/* 最近文章列表 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                最近文章
              </h2>
              <Link
                href="/academy"
                className="text-sm text-amber-600 dark:text-amber-400 link-underline"
              >
                查看全部 →
              </Link>
            </div>
            <RecentPostsTable posts={posts.slice(0, 5)} />
          </div>

          {/* 快捷入口 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="https://vercel.com/dashboard"
              target="_blank"
              className="block p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 card-lift"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">📊</span>
                <h3 className="font-semibold text-zinc-900 dark:text-white">
                  Vercel Analytics
                </h3>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                查看实时流量、访客、页面数据
              </p>
            </Link>
            <Link
              href="https://github.com/xuankeke168-lang/my-web"
              target="_blank"
              className="block p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 card-lift"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">📦</span>
                <h3 className="font-semibold text-zinc-900 dark:text-white">
                  GitHub 仓库
                </h3>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                提交记录 / Issues / Discussions
              </p>
            </Link>
            <div className="block p-5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 opacity-60">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">⚙️</span>
                <h3 className="font-semibold text-zinc-900 dark:text-white">
                  系统设置
                </h3>
                <span className="ml-auto text-xs text-zinc-400">开发中</span>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-500">
                SEO / 友链 / 关于页
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function countByCategory(
  posts: { category: string }[]
): Record<string, number> {
  return posts.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});
}

function daysSinceStart(): number {
  const start = new Date("2026-01-28");
  const today = new Date();
  const diff = today.getTime() - start.getTime();
  return Math.max(1, Math.floor(diff / (1000 * 60 * 60 * 24)));
}
