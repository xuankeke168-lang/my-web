import Link from "next/link";

/**
 * 油田 ERP 学习站首页
 *
 * 路由：/erp
 * 入口：src/app/academy/page.tsx 第 28 行（href="/erp"）
 *
 * 展示 10 大 SAP ERP 模块（FI/CO/SD/PP/PM/MM/PS/QM/HR/EHS）核心学习入口，
 * 每个模块链接到 content/blog/ 下对应的 erp-*-overview.md 文章。
 */

type ErpModuleGroup = "财务核心" | "业务运营" | "专项管理";

interface ErpModule {
  code: string;
  name: string;
  fullName: string;
  slug: string;
  emoji: string;
  group: ErpModuleGroup;
  tagline: string;
  highlights: string[];
  gradient: string;
}

const ERP_MODULES: ErpModule[] = [
  {
    code: "FI",
    name: "财务会计",
    fullName: "Financial Accounting",
    slug: "erp-fi-overview",
    emoji: "💰",
    group: "财务核心",
    tagline: "整个 ERP 系统的'账房先生'，记录每一笔钱的来龙去脉",
    highlights: ["总账 / 应收 / 应付", "统驭科目机制", "与 CO 平行记账"],
    gradient: "from-amber-500 to-orange-600",
  },
  {
    code: "CO",
    name: "管理会计",
    fullName: "Controlling",
    slug: "erp-co-overview",
    emoji: "📊",
    group: "财务核心",
    tagline: "管成本、管利润中心的内当家，对内出报表给老板看",
    highlights: ["成本中心 / 利润中心", "作业成本法", "与 FI 平行记账"],
    gradient: "from-rose-500 to-pink-600",
  },
  {
    code: "SD",
    name: "销售分销",
    fullName: "Sales & Distribution",
    slug: "erp-sd-overview",
    emoji: "🚚",
    group: "业务运营",
    tagline: "原油/天然气销售订单、发货、结算一条龙",
    highlights: ["销售订单 → 开票", "价格条件 / 信用管理", "出具销售发票"],
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    code: "PP",
    name: "生产计划",
    fullName: "Production Planning",
    slug: "erp-pp-overview",
    emoji: "🏭",
    group: "业务运营",
    tagline: "把油田'采、输、炼'的每一道工序安排得明明白白",
    highlights: ["BOM / 工艺路线", "MRP 运算", "生产订单管理"],
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    code: "MM",
    name: "物料管理",
    fullName: "Materials Management",
    slug: "erp-mm-overview",
    emoji: "📦",
    group: "业务运营",
    tagline: "管物料、管采购、管库存，是供应链的中枢",
    highlights: ["采购 / 库存 / 发票校验", "三方匹配", "物料主数据"],
    gradient: "from-teal-500 to-emerald-600",
  },
  {
    code: "PM",
    name: "设备维护",
    fullName: "Plant Maintenance",
    slug: "erp-pm-overview",
    emoji: "🔧",
    group: "专项管理",
    tagline: "管抽油机、注水泵等油田核心设备的'全生命周期'",
    highlights: ["设备台账", "预防性维护", "维修工单 / 成本归集"],
    gradient: "from-purple-500 to-violet-600",
  },
  {
    code: "PS",
    name: "项目管理",
    fullName: "Project System",
    slug: "erp-ps-overview",
    emoji: "🗂️",
    group: "专项管理",
    tagline: "把'产能建设'、'老区改造'等大项目的 WBS 拆得清清楚楚",
    highlights: ["WBS 网络", "项目预算 / 实际", "项目结算"],
    gradient: "from-fuchsia-500 to-pink-600",
  },
  {
    code: "QM",
    name: "质量管理",
    fullName: "Quality Management",
    slug: "erp-qm-overview",
    emoji: "✅",
    group: "专项管理",
    tagline: "管原油含水、含硫等质量检验，把好产品出口关",
    highlights: ["检验计划", "质量通知", "质量报告"],
    gradient: "from-green-500 to-lime-600",
  },
  {
    code: "HR",
    name: "人力资源",
    fullName: "Human Resources",
    slug: "erp-hr-overview",
    emoji: "👥",
    group: "专项管理",
    tagline: "管组织、管人事、管薪酬，是 HR 部门的数字化底座",
    highlights: ["组织架构 / 人事档案", "考勤 / 薪酬", "与 FI 集成过账"],
    gradient: "from-sky-500 to-blue-600",
  },
  {
    code: "EHS",
    name: "安全环保",
    fullName: "Environment Health Safety",
    slug: "erp-ehs-overview",
    emoji: "🛡️",
    group: "专项管理",
    tagline: "管安全风险、管环境合规，是油田'红线'的守护者",
    highlights: ["事故 / 隐患上报", "作业许可", "环境监测"],
    gradient: "from-red-500 to-rose-600",
  },
];

const GROUP_META: Record<
  ErpModuleGroup,
  { emoji: string; desc: string; gradient: string }
> = {
  财务核心: {
    emoji: "💼",
    desc: "财务人员的主战场，FI 与 CO 平行记账共同构成油田账务体系",
    gradient:
      "from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30",
  },
  业务运营: {
    emoji: "⚙️",
    desc: "油田采、输、销业务流转的核心，覆盖订单、生产、库存全链路",
    gradient:
      "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
  },
  专项管理: {
    emoji: "🛠️",
    desc: "围绕设备、项目、质量、人力、安全等专业领域，支撑油田精细化管理",
    gradient:
      "from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30",
  },
};

export default function ErpLearningStation() {
  const groups: ErpModuleGroup[] = ["财务核心", "业务运营", "专项管理"];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
          <Link
            href="/academy"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            AI学院
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900 dark:text-zinc-100">ERP学习站</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium mb-4">
            🏭 油田 ERP 学习站
          </div>
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-3">
            系统学懂 SAP ERP 十大模块
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
            以油田企业真实业务为底色，从财务核心到业务运营再到专项管理，
            用通俗语言讲清每个模块在油田里到底管什么、怎么流转、彼此怎么集成。
          </p>
        </header>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {[
            { num: "10", label: "核心模块" },
            { num: "3", label: "业务领域" },
            { num: "10", label: "深度文章" },
            { num: "0", label: "入坑门槛" },
          ].map((s) => (
            <div
              key={s.label}
              className="text-center p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700"
            >
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {s.num}
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* 模块分组 */}
        {groups.map((group) => {
          const modules = ERP_MODULES.filter((m) => m.group === group);
          const meta = GROUP_META[group];

          return (
            <section key={group} className="mb-10">
              <div
                className={`p-5 rounded-2xl bg-gradient-to-r ${meta.gradient} border border-zinc-200 dark:border-zinc-800 mb-5`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-2xl">{meta.emoji}</span>
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                    {group}
                  </h2>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    · {modules.length} 个模块
                  </span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {meta.desc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {modules.map((m) => (
                  <Link
                    key={m.code}
                    href={`/academy/${m.slug}`}
                    className="group block p-5 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center text-2xl shadow-sm`}
                      >
                        {m.emoji}
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                          {m.code}
                        </div>
                        <div className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                          {m.fullName}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1.5">
                      {m.code} · {m.name}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                      {m.tagline}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {m.highlights.map((h) => (
                        <span
                          key={h}
                          className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 text-xs rounded"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    <span className="text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:underline">
                      深入学习 →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* Footer CTA */}
        <section className="mt-12 p-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold mb-1">
                看完不过瘾？回到 AI 学院继续学
              </h3>
              <p className="text-blue-100 text-sm">
                财务数智化、预算成本、管理会计、AI 应用，更多实战文章持续更新
              </p>
            </div>
            <Link
              href="/academy"
              className="self-start md:self-center px-5 py-2.5 bg-white text-blue-700 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors whitespace-nowrap"
            >
              返回 AI 学院 →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
