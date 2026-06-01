import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            关于我
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            十余年深耕油田财务管理，目前专注数智化转型实践
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* 自我介绍 */}
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-700">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 mb-6" />

            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              你好，很高兴认识你！
            </h2>

            <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>
                我是一名在油田企业从事财务信息化工作十余年的老兵。从最初的会计电算化到如今的数智化转型，我亲历了油田财务信息化从起步到成熟的整个历程。
              </p>
              <p>
                这些年做过不少项目：SAP
                ERP实施、财务共享中心建设、预算管理系统上线、管理会计报表体系搭建……踩过的坑、填过的坑，都变成了宝贵的经验。
              </p>
              <p>
                现在想把这些实战经验整理出来，分享给同样在油田财务领域奋斗的同行们。
                希望我的分享能帮你少走一些弯路。
              </p>
            </div>
          </div>

          {/* 核心能力 */}
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-700">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
              <span>🎯</span> 核心能力
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: "预算成本管理",
                  desc: "目标成本、作业成本、标准成本体系设计",
                },
                { name: "管理会计", desc: "阿米巴经营、利润中心、内部市场化" },
                { name: "ERP系统实施", desc: "SAP PS/FI/CO模块，深耕油田业务" },
                { name: "数智化转型", desc: "业财一体、数据治理、智能化应用" },
              ].map((skill) => (
                <div
                  key={skill.name}
                  className="p-4 bg-zinc-50 dark:bg-zinc-700/50 rounded-xl"
                >
                  <h4 className="font-medium text-zinc-900 dark:text-white mb-1">
                    {skill.name}
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 关注领域 */}
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-700">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
              <span>📚</span> 关注与分享
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "预算成本管理",
                "管理会计报表",
                "油田ERP深化应用",
                "数智化转型",
                "RPA智能报销",
                "AI+财务场景",
                "业财一体化",
                "数据治理",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 联系方式 */}
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-700">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              <span>📬</span> 交流探讨
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              如果你有油田财务信息化方面的问题，或者想交流经验，欢迎联系我。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 微信公众号 */}
              <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-700/50 rounded-xl">
                <div className="w-32 h-32 mx-auto mb-3 rounded-lg overflow-hidden">
                  <Image
                    src="/wechat-gzh-qr.png"
                    alt="微信公众号"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-medium text-zinc-900 dark:text-white">
                  微信公众号
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  油田财务数智化
                </p>
              </div>
              {/* 个人微信 */}
              <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-700/50 rounded-xl">
                <div className="w-32 h-32 mx-auto mb-3 rounded-lg overflow-hidden">
                  <Image
                    src="/wechat-personal.png"
                    alt="个人微信"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-medium text-zinc-900 dark:text-white">
                  个人微信
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  加好友请备注油田财务
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                联系我 →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
