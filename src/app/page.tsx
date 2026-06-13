import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { getTools } from "@/lib/tools";

interface PillarCard {
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  meta: string;
  href: string;
}

const PILLARS: PillarCard[] = [
  {
    num: "01",
    title: "AI 工具",
    subtitle: "我用什么",
    desc: "发现 → 试用 → 留下证据",
    meta: "32 篇 · 持续更新",
    href: "/academy?tag=工具",
  },
  {
    num: "02",
    title: "AI 学习",
    subtitle: "我怎么学",
    desc: "资源 → 方法 → 用得上",
    meta: "18 篇 · 含书单课程",
    href: "/academy?tag=学习",
  },
  {
    num: "03",
    title: "AI 案例",
    subtitle: "解决什么",
    desc: "问题 → 解法 → AI 出招",
    meta: "24 篇 · 真实场景",
    href: "/academy?tag=案例",
  },
  {
    num: "04",
    title: "AI 感悟",
    subtitle: "想到什么",
    desc: "思考 → 记录 → 真实成长",
    meta: "46 篇 · 过程可见",
    href: "/academy?tag=感悟",
  },
];

export default async function Home() {
  const posts = getAllPosts().slice(0, 3);
  const tools = getTools().filter((t) => t.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {/* ========== 第一屏：Hero（不对称 + 大字 + typewriter） ========== */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20">
        <div className="grid md:grid-cols-12 gap-8">
          {/* 左 7：主内容 */}
          <div className="md:col-span-7">
            <div className="font-mono text-xs text-[var(--zinc-soft)] mb-4 animate-fade-in-up">
              <span className="text-[var(--amber)]">$</span> cat 2026-06-13.md
              <span className="inline-block w-2 h-3 bg-[var(--ink)] align-middle ml-1 animate-blink" />
            </div>

            <h1 className="font-bold leading-[0.95] tracking-tight mb-8 animate-fade-in-up delay-100">
              <span className="block text-[clamp(3rem,8vw,7rem)] text-[var(--ink)]">
                今天
              </span>
              <span className="block text-[clamp(3rem,8vw,7rem)] text-[var(--ink)]">
                又进步了
              </span>
              <span className="block text-[clamp(3rem,8vw,7rem)] text-[var(--amber)]">
                一点点。
              </span>
            </h1>

            <div className="font-mono text-xs text-[var(--zinc-soft)] space-y-1 mb-10 animate-fade-in-up delay-200">
              <div>2026.06.13 / 星期六 / AI 学习的第 137 天</div>
              <div>
                状态：
                <span className="text-[var(--mint)]">●</span> 在线 · 持续写
              </div>
            </div>

            <div className="flex flex-wrap gap-3 animate-fade-in-up delay-300">
              <Link
                href="/academy"
                className="px-6 py-3 bg-[var(--ink)] text-[var(--paper)] text-sm font-medium hover:bg-[var(--amber)] transition-colors"
              >
                开始读日记 →
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border border-[var(--ink)] text-[var(--ink)] text-sm font-medium hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
              >
                聊聊
              </Link>
            </div>
          </div>

          {/* 右 5：副信息 */}
          <div className="md:col-span-5 md:pt-8 animate-fade-in-up delay-400">
            <div className="border-l border-[var(--line)] pl-8 space-y-7 text-sm leading-relaxed">
              <p className="text-[var(--ink-soft)]">
                一个 10+ 年财务人，
                <br />
                正在认真学 AI 怎么用。
              </p>
              <p className="text-[var(--ink-soft)]">
                不教你，只分享我自己在学的、
                <br />
                在用的、踩过的。
              </p>
              <p className="text-[var(--zinc-soft)] font-mono text-xs">
                —— 写日记不为流量
                <br />
                只为自己进步
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 第二屏：4 主线（不对称 2×2 网格） ========== */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-[var(--line)]">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-2xl font-bold tracking-tight">4 条主线</h2>
          <span className="font-mono text-xs text-[var(--zinc-soft)]">
            #002 / pillars
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-0 border border-[var(--line)]">
          {PILLARS.map((p, i) => (
            <Link
              key={p.num}
              href={p.href}
              className={`group p-8 card-lift border-[var(--line)] ${
                i % 2 === 0 ? "md:border-r" : ""
              } ${i < 2 ? "border-b" : ""}`}
            >
              <div className="flex items-baseline justify-between mb-6">
                <span className="font-mono text-xs text-[var(--amber)]">
                  {p.num}
                </span>
                <span className="font-mono text-xs text-[var(--zinc-soft)]">
                  {p.meta}
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-2 tracking-tight">
                {p.title}
              </h3>
              <p className="text-sm text-[var(--zinc-soft)] mb-4 font-mono">
                {p.subtitle}
              </p>
              <p className="text-base text-[var(--ink-soft)]">
                {p.desc}
              </p>
              <div className="mt-6 text-sm text-[var(--ink)] link-underline inline-block">
                进入 →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========== 第三屏：最新文章（极简列表） ========== */}
      {posts.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16 border-t border-[var(--line)]">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="text-2xl font-bold tracking-tight">最新</h2>
            <Link
              href="/academy"
              className="font-mono text-xs text-[var(--ink)] link-underline"
            >
              全部 →
            </Link>
          </div>

          <div className="divide-y divide-[var(--line)] border-t border-b border-[var(--line)]">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/academy/${post.slug}`}
                className="block py-6 hover:bg-[var(--ink)]/[0.02] transition-colors"
              >
                <div className="grid md:grid-cols-12 gap-4 items-baseline">
                  <span className="md:col-span-1 font-mono text-xs text-[var(--amber)]">
                    {String(i + 1).padStart(3, "0")}
                  </span>
                  <span className="md:col-span-2 font-mono text-xs text-[var(--zinc-soft)]">
                    {post.date}
                  </span>
                  <span className="md:col-span-2 font-mono text-xs text-[var(--mint)]">
                    [{post.category}]
                  </span>
                  <span className="md:col-span-7 text-lg font-medium group-hover:text-[var(--amber)] transition-colors">
                    {post.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ========== 第四屏：老登介绍（不对称） ========== */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-[var(--line)]">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <div className="font-mono text-xs text-[var(--zinc-soft)] mb-3">
              #003 / about
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-[var(--ink)] to-[var(--amber)] mb-4" />
            <h2 className="text-2xl font-bold tracking-tight">
              财务老登
              <br />
              <span className="text-[var(--zinc-soft)] font-normal text-base">
                在学 AI / 在北京
              </span>
            </h2>
          </div>

          <div className="md:col-span-8 md:pt-12">
            <div className="space-y-5 text-base leading-relaxed text-[var(--ink-soft)]">
              <p>
                10+ 年财务人，最近两年一头扎进 AI
                里。不教你，只分享我自己在学的、在用的、踩的。
              </p>
              <p>
                <span className="text-[var(--ink)]">价值观</span>：保持好奇、热爱运动、遵从内心、拥抱 AI。
              </p>
              <p>
                <span className="text-[var(--ink)]">不写</span>：功利教程、装逼测评、空洞鸡汤。
              </p>
              <p>
                <span className="text-[var(--ink)]">想</span>：跟你一起，每天进步一点点。
              </p>
              <Link
                href="/about"
                className="inline-block mt-4 text-sm text-[var(--ink)] link-underline"
              >
                看看老登完整履历 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 第五屏：留言入口（极简） ========== */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-[var(--line)]">
        <div className="grid md:grid-cols-12 gap-8 items-baseline">
          <div className="md:col-span-5">
            <div className="font-mono text-xs text-[var(--zinc-soft)] mb-3">
              #004 / contact
            </div>
            <h2 className="text-3xl font-bold tracking-tight leading-tight">
              想聊一聊？
            </h2>
          </div>
          <div className="md:col-span-7 space-y-4 text-base text-[var(--ink-soft)]">
            <p>
              不想加群、不想留微信。
              <br />
              想留个言，或者发封邮件。
            </p>
            <p className="font-mono text-xs text-[var(--zinc-soft)]">
              或者在任意文章下留言——我会一条条看。
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-[var(--ink)] text-[var(--paper)] text-sm font-medium hover:bg-[var(--amber)] transition-colors"
              >
                给我留言
              </Link>
              <a
                href="mailto:hi@example.com"
                className="px-5 py-2.5 border border-[var(--ink)] text-[var(--ink)] text-sm font-medium hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
              >
                发邮件
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--line)] mt-8">
        <div className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center text-xs font-mono text-[var(--zinc-soft)]">
          <span>© 2024-2026 财务老登学AI</span>
          <span>
            AI 学习的第 <span className="text-[var(--amber)]">137</span> 天
          </span>
        </div>
      </footer>
    </div>
  );
}
