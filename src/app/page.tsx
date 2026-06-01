import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { getTools } from "@/lib/tools";
import { getCourses } from "@/lib/courses";

export default async function Home() {
  const posts = getAllPosts().slice(0, 3);
  const tools = getTools()
    .filter((t) => t.featured)
    .slice(0, 2);
  const courses = (await getCourses()).filter((c) => c.featured).slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-900">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            专注油田企业财务数智化转型与AI应用
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 leading-tight">
            油田财务数智化实战笔记
            <br />
            <span className="text-blue-600">预算成本 · 管理会计 · AI应用</span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            十余年油田财务经验沉淀，聚焦预算成本管理、管理会计报表、数智化转型落地实践。
            用通俗易懂的方式，讲透油田企业的财务数智化之路。
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/academy"
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
            >
              浏览文章
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 bg-zinc-900 dark:bg-zinc-800 text-white rounded-full font-medium hover:bg-zinc-700 dark:hover:bg-zinc-700 transition-colors"
            >
              关于作者
            </Link>
          </div>
        </div>
      </section>

      {/* 核心关注领域 */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
            核心关注领域
          </h2>
          <p className="text-zinc-500 dark:text-zinc-500">
            深入油田企业财务管理的各个环节
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            {
              icon: "🏗️",
              title: "预算成本管理",
              desc: "目标成本、作业成本、标准成本",
            },
            {
              icon: "📊",
              title: "管理会计",
              desc: "阿米巴经营、利润中心、成本分析",
            },
            {
              icon: "🔄",
              title: "数智化转型",
              desc: "RPA智能报销、业财一体化、数据治理",
            },
            {
              icon: "⚙️",
              title: "ERP深化应用",
              desc: "PS项目管理、FI-CO财务模块",
            },
            {
              icon: "🤖",
              title: "AI+财务场景",
              desc: "智能审核、数据预测、自动化报表",
            },
            {
              icon: "📈",
              title: "经营分析",
              desc: "KPI监控、异常预警、决策支撑",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group p-5 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-1 text-sm">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Three Main Sections */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {/* AI学院 */}
          <Link
            href="/academy"
            className="group p-8 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all"
          >
            <div className="text-4xl mb-4">🎓</div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
              学习文章
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
              财务数智化、预算成本、管理会计、AI应用的实战经验
            </p>
            <span className="text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:underline">
              开始学习 →
            </span>
          </Link>

          {/* 工具箱 */}
          <Link
            href="/tools"
            className="group p-8 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-lg transition-all"
          >
            <div className="text-4xl mb-4">🛠️</div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
              工具资料
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
              油田财务分析模板、数据处理工具下载
            </p>
            <span className="text-purple-600 dark:text-purple-400 text-sm font-medium group-hover:underline">
              了解更多 →
            </span>
          </Link>

          {/* 关于 */}
          <Link
            href="/about"
            className="group p-8 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:border-green-300 dark:hover:border-green-600 hover:shadow-lg transition-all"
          >
            <div className="text-4xl mb-4">👨‍💻</div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
              关于作者
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
              十余年油田财务信息化经验，专注数智化转型
            </p>
            <span className="text-green-600 dark:text-green-400 text-sm font-medium group-hover:underline">
              了解更多 →
            </span>
          </Link>
        </div>
      </section>

      {/* Featured Tools */}
      {tools.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 py-12 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              精选工具
            </h2>
            <Link
              href="/tools"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              查看全部 →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="group bg-white dark:bg-zinc-800 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 hover:shadow-lg transition-all"
              >
                <div
                  className={`h-32 bg-gradient-to-br ${tool.coverGradient}`}
                />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                      {tool.name}
                    </h3>
                    <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-700 text-zinc-500 text-xs rounded">
                      v{tool.version}
                    </span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    {tool.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Latest Posts */}
      {posts.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 py-12 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              最新文章
            </h2>
            <Link
              href="/academy"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              查看全部 →
            </Link>
          </div>
          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/academy/${post.slug}`}
                className="block p-5 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
              >
                <div className="flex items-center gap-3 text-xs text-zinc-500 mb-2">
                  <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-1">
                  {post.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-2">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-8">
        <div className="max-w-5xl mx-auto px-6 py-8 text-center text-zinc-500 dark:text-zinc-500 text-sm">
          © 2024 油田财务数智化笔记 · 专注油田企业财务转型实践
        </div>
      </footer>
    </div>
  );
}
