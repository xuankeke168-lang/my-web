import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export default function Home() {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-900">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6">
            你好，我是<span className="text-blue-600">创作者</span>
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
            一名热爱创造的开发者，在这里分享我的作品和思考
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/works"
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              查看作品
            </Link>
            <Link
              href="/blog"
              className="px-8 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-full font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              阅读博客
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Works Preview */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">精选作品</h2>
          <Link href="/works" className="text-blue-600 hover:text-blue-700 font-medium">
            查看全部 →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="group bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700 hover:shadow-lg transition-all"
            >
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500" />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                  作品名称 {item}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
                  这是一个作品的简短描述，介绍项目的主要功能和特点。
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 text-xs rounded-full">
                    React
                  </span>
                  <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 text-xs rounded-full">
                    TypeScript
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Blog Posts Preview */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">最新博客</h2>
          <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-medium">
            查看全部 →
          </Link>
        </div>
        <div className="space-y-4">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="text-sm text-zinc-500 dark:text-zinc-500">
                  {post.date}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                    {post.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-16">
        <div className="max-w-5xl mx-auto px-6 py-8 text-center text-zinc-500 dark:text-zinc-500 text-sm">
          © 2024 我的个人作品集。All rights reserved.
        </div>
      </footer>
    </div>
  );
}
