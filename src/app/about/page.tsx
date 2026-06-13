import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* 返回链接 */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-[var(--zinc-soft)] hover:text-[var(--ink)] link-underline mb-12"
        >
          ← 回到日记
        </Link>

        {/* 头部 */}
        <div className="mb-16">
          <div className="font-mono text-xs text-[var(--zinc-soft)] mb-4">
            #about / 老登自述
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            一个正在学 AI
            <br />
            的财务老登
          </h1>
          <p className="text-lg text-[var(--ink-soft)] leading-relaxed">
            10+ 年财务，最近两年一头扎进 AI 里。
            <br />
            不是 AI 老师，是跟你一起学的同行。
          </p>
        </div>

        <div className="space-y-12">
          {/* 我是谁 */}
          <section>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-mono text-xs text-[var(--amber)]">01</span>
              <h2 className="text-2xl font-bold tracking-tight">我是谁</h2>
            </div>
            <div className="space-y-4 text-base text-[var(--ink-soft)] leading-relaxed">
              <p>
                10+ 年企业财务管理经验，做过 SAP ERP
                实施、财务共享、预算系统、管理会计报表。
              </p>
              <p>
                这些年亲历的事：把单井成本算明白、把 200
                张没人看的报表砍到 20
                张、把月报从熬夜拼材料变成 AI 出初稿。
              </p>
              <p>
                现在想做的：把"今天又进步了一点点"的过程记录下来。
              </p>
            </div>
          </section>

          {/* 价值观 */}
          <section>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-mono text-xs text-[var(--amber)]">02</span>
              <h2 className="text-2xl font-bold tracking-tight">价值观</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "运动", score: 9 },
                { name: "好奇心", score: 8 },
                { name: "遵从内心", score: 7 },
                { name: "AI 使用", score: 6 },
              ].map((v) => (
                <div
                  key={v.name}
                  className="p-4 border border-[var(--line)] card-lift"
                >
                  <div className="font-mono text-xs text-[var(--zinc-soft)] mb-1">
                    {v.score}/10
                  </div>
                  <div className="text-lg font-medium">{v.name}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-[var(--zinc-soft)]">
              排序按"自评强度"：运动 → 好奇心 → 遵从内心 → AI 使用。
              <br />
              AI 使用排在最后不是因为不重视——是因为还在学，承认自己还不够。
            </p>
          </section>

          {/* 不写什么 */}
          <section>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-mono text-xs text-[var(--amber)]">03</span>
              <h2 className="text-2xl font-bold tracking-tight">不写什么</h2>
            </div>
            <ul className="space-y-2 text-base text-[var(--ink-soft)]">
              <li className="flex gap-3">
                <span className="text-[var(--zinc-soft)]">×</span>
                <span>功利教程（学完月入 X 万那种）</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--zinc-soft)]">×</span>
                <span>装逼测评（堆数据不写人话）</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[var(--zinc-soft)]">×</span>
                <span>空洞鸡汤（"坚持就能成功"那种）</span>
              </li>
            </ul>
          </section>

          {/* 想做什么 */}
          <section>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-mono text-xs text-[var(--amber)]">04</span>
              <h2 className="text-2xl font-bold tracking-tight">想做什么</h2>
            </div>
            <div className="space-y-4 text-base text-[var(--ink-soft)] leading-relaxed">
              <p>
                把自己学的、用的、踩的，老老实实写下来。
              </p>
              <p>
                顺便用 AI 解决一些财务/工作/生活里的真实问题。
              </p>
              <p>
                如果你也是兴趣驱动、想用 AI 让自己变强一点的财务同行——
                欢迎一起。
              </p>
            </div>
          </section>

          {/* 联系方式 */}
          <section className="border-t border-[var(--line)] pt-12">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-mono text-xs text-[var(--amber)]">05</span>
              <h2 className="text-2xl font-bold tracking-tight">怎么找到我</h2>
            </div>
            <p className="text-base text-[var(--ink-soft)] mb-6">
              不想加群、不想留微信。
              <br />
              想留个言，或者发封邮件。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-4 border border-[var(--line)]">
                <div className="w-40 h-40 mx-auto mb-3">
                  <Image
                    src="/wechat-gzh-qr.png"
                    alt="微信公众号"
                    width={160}
                    height={160}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="font-medium">微信公众号</p>
                <p className="text-xs text-[var(--zinc-soft)] font-mono mt-1">
                  财务老登学AI
                </p>
              </div>
              <div className="text-center p-4 border border-[var(--line)]">
                <div className="w-40 h-40 mx-auto mb-3">
                  <Image
                    src="/wechat-personal.png"
                    alt="个人微信"
                    width={160}
                    height={160}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="font-medium">个人微信</p>
                <p className="text-xs text-[var(--zinc-soft)] font-mono mt-1">
                  加好友请备注"AI"
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-[var(--ink)] text-[var(--paper)] text-sm font-medium hover:bg-[var(--amber)] transition-colors"
              >
                给我留言
              </Link>
              <Link
                href="/academy"
                className="px-5 py-2.5 border border-[var(--ink)] text-[var(--ink)] text-sm font-medium hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors"
              >
                读成长记录 →
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
