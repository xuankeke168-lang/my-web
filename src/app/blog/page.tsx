import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            博客
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            这里记录了我的技术思考、学习心得和生活感悟。
          </p>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
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
              <p className="text-zinc-600 dark:text-zinc-400">
                {post.excerpt}
              </p>
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
