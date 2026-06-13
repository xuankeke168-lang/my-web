import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

interface RecentPostsTableProps {
  posts: BlogPost[];
}

const categoryColors: Record<string, string> = {
  工具: "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300",
  学习: "bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300",
  案例: "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300",
  感悟: "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
};

export default function RecentPostsTable({ posts }: RecentPostsTableProps) {
  if (posts.length === 0) {
    return (
      <div className="p-8 text-center bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-500">
        还没有文章，去写第一篇吧 ✍️
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <table className="w-full">
        <thead className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
          <tr>
            <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              标题
            </th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              主线
            </th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              日期
            </th>
            <th className="text-right px-4 py-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              操作
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {posts.map((post) => (
            <tr
              key={post.slug}
              className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
            >
              <td className="px-4 py-3">
                <div className="font-medium text-zinc-900 dark:text-white line-clamp-1">
                  {post.title}
                </div>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                    categoryColors[post.category] ??
                    "bg-zinc-100 dark:bg-zinc-800 text-zinc-600"
                  }`}
                >
                  {post.category}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-zinc-500 dark:text-zinc-500 whitespace-nowrap">
                {post.date}
              </td>
              <td className="px-4 py-3 text-right">
                <Link
                  href={`/academy/${post.slug}`}
                  target="_blank"
                  className="text-sm text-amber-600 dark:text-amber-400 link-underline"
                >
                  查看
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
