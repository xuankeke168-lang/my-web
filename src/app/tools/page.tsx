import { getTools } from "@/lib/tools";

export default function Tools() {
  const tools = getTools();
  const featuredTools = tools.filter((t) => t.featured);
  const otherTools = tools.filter((t) => !t.featured);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            工具箱
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            我开发的 AI 小工具，下载即可使用，让效率翻倍
          </p>
        </div>

        {/* Featured Tools */}
        {featuredTools.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
              精选工具
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredTools.map((tool) => (
                <div
                  key={tool.id}
                  className="group bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700 hover:shadow-xl transition-all"
                >
                  <div
                    className={`h-48 bg-gradient-to-br ${tool.coverGradient}`}
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                        {tool.name}
                      </h3>
                      <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400 text-xs rounded">
                        v{tool.version}
                      </span>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                      {tool.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {tool.platform === "windows" && (
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm rounded">
                            Windows
                          </span>
                        )}
                        {tool.platform === "mac" && (
                          <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 text-sm rounded">
                            macOS
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-zinc-500">
                        {tool.fileSize}
                      </span>
                    </div>
                    <a
                      href={tool.downloadUrl}
                      className="mt-4 block w-full text-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      下载安装
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Tools */}
        {otherTools.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
              更多工具
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherTools.map((tool) => (
                <div
                  key={tool.id}
                  className="group bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700 hover:shadow-lg transition-all"
                >
                  <div
                    className={`h-32 bg-gradient-to-br ${tool.coverGradient}`}
                  />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                        {tool.name}
                      </h3>
                      <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400 text-xs rounded">
                        v{tool.version}
                      </span>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-3">
                      {tool.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-500">
                        {tool.fileSize}
                      </span>
                      <a
                        href={tool.downloadUrl}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        下载 →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {tools.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛠️</div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
              工具箱正在搭建中
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              我的AI小工具即将上线，敬请期待～
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
