import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            关于我
          </h1>
        </div>

        {/* Content */}
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-700">
            {/* Avatar Placeholder */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 mb-6" />

            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              👋 你好，很高兴认识你！
            </h2>

            <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
              <p>
                我是一名热爱创造的开发者，专注于前端开发和用户体验设计。
                在这个网站上，我会分享我的项目作品和技术思考。
              </p>
              <p>
                <strong>技术栈：</strong> React、TypeScript、Next.js、Tailwind CSS
              </p>
              <p>
                <strong>兴趣爱好：</strong> 摄影、阅读、户外徒步
              </p>
              <p>
                <strong>联系方式：</strong> 欢迎通过 <Link href="/contact" className="text-blue-600 hover:underline">联系页面</Link> 与我取得联系！
              </p>
            </div>

            {/* Skills */}
            <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-700">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                技能专长
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['React', 'TypeScript', 'Next.js', 'Tailwind', 'Node.js', 'Figma', 'Git', 'UI/UX'].map((skill) => (
                  <div
                    key={skill}
                    className="px-4 py-3 bg-zinc-100 dark:bg-zinc-700 rounded-lg text-center text-zinc-700 dark:text-zinc-300 font-medium"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
