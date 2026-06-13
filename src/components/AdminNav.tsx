import Link from "next/link";
import { signOut } from "next-auth/react";

interface AdminNavProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    login?: string;
  };
}

export default function AdminNav({ user }: AdminNavProps) {
  return (
    <nav className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* 左侧：Logo + 主导航 */}
        <div className="flex items-center gap-8">
          <Link
            href="/admin"
            className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white"
          >
            <span className="text-xl">⚡</span>
            <span>财务老登 · 后台</span>
          </Link>

          <div className="hidden md:flex items-center gap-1 text-sm">
            <Link
              href="/admin"
              className="px-3 py-1.5 rounded-md text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              仪表盘
            </Link>
            <span className="px-3 py-1.5 rounded-md text-zinc-400 dark:text-zinc-600 cursor-not-allowed">
              文章管理
            </span>
            <span className="px-3 py-1.5 rounded-md text-zinc-400 dark:text-zinc-600 cursor-not-allowed">
              评论
            </span>
            <span className="px-3 py-1.5 rounded-md text-zinc-400 dark:text-zinc-600 cursor-not-allowed">
              系统设置
            </span>
          </div>
        </div>

        {/* 右侧：用户 + 退出 */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 link-underline"
          >
            访问前台 ↗
          </Link>

          {user.image && (
            <img
              src={user.image}
              alt={user.name ?? "user"}
              className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-700"
            />
          )}
          <div className="hidden md:block text-sm">
            <div className="font-medium text-zinc-900 dark:text-white">
              {user.name ?? "老板"}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-500">
              @{user.login}
            </div>
          </div>

          <Link
            href="/api/auth/signout"
            className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 link-underline ml-2"
          >
            退出
          </Link>
        </div>
      </div>
    </nav>
  );
}
