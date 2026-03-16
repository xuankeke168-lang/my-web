import Link from 'next/link';

// 示例作品数据
const works = [
  {
    id: 1,
    title: '电商平台 redesign',
    description: '为一个大型电商平台重新设计用户体验，提升转化率 35%。',
    tags: ['UI/UX', 'Figma', '用户研究'],
    color: 'from-blue-400 to-cyan-500',
  },
  {
    id: 2,
    title: '数据可视化仪表盘',
    description: '为企业客户打造的实时数据监控和分析平台。',
    tags: ['React', 'D3.js', 'TypeScript'],
    color: 'from-purple-400 to-pink-500',
  },
  {
    id: 3,
    title: '移动应用设计系统',
    description: '一套完整的移动端设计系统，覆盖 50+ 组件。',
    tags: ['设计系统', 'React Native', '文档'],
    color: 'from-orange-400 to-red-500',
  },
  {
    id: 4,
    title: 'AI 写作助手',
    description: '基于大语言模型的智能写作辅助工具。',
    tags: ['AI', 'Python', 'NLP'],
    color: 'from-green-400 to-emerald-500',
  },
];

export default function Works() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            我的作品
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            这里展示了我的一些代表性项目，涵盖产品设计、开发和创新实验。
          </p>
        </div>

        {/* Works Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {works.map((work) => (
            <div
              key={work.id}
              className="group bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700 hover:shadow-xl transition-all duration-300"
            >
              {/* 封面图 */}
              <div className={`h-48 bg-gradient-to-br ${work.color}`} />

              {/* 内容 */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                  {work.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  {work.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {work.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA for Courses */}
        <div className="mt-16 p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            🎓 想学习更多吗？
          </h2>
          <p className="text-blue-100 mb-6">
            我的系列课程即将上线，教你如何从零开始打造专业作品！
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors">
            提前通知
          </button>
        </div>
      </div>
    </div>
  );
}
