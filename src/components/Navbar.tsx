import Link from "next/link";
import NavDropdown from "@/components/NavDropdown";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/90 dark:bg-black/90 backdrop-blur-md border-b border-[var(--line)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-baseline gap-2 text-base font-semibold text-[var(--ink)] hover:text-[var(--amber)] transition-colors whitespace-nowrap"
          >
            <span className="font-mono text-xs text-[var(--zinc-soft)]">#001</span>
            <span>财务老登学AI</span>
          </Link>

          {/* 主导航 */}
          <div className="flex items-center gap-5 lg:gap-7 text-sm">
            {/* 日记 = 首页 */}
            <Link
              href="/"
              className="link-underline text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
            >
              日记
            </Link>

            {/* 成长 · 下拉：4 主线 */}
            <NavDropdown
              label="成长"
              items={[
                { label: "工具", href: "/academy?category=工具", icon: "🛠️", desc: "AI 工具上手实战" },
                { label: "学习", href: "/academy?category=学习", icon: "📚", desc: "学 AI 的方法心得" },
                { label: "案例", href: "/academy?category=案例", icon: "💡", desc: "真实工作场景" },
                { label: "感悟", href: "/academy?category=感悟", icon: "✍️", desc: "成长过程 + 反思" },
              ]}
              allHref="/academy"
              allLabel="看全部文章"
            />

            {/* 工具库 · 独立页（产品 / 模板） */}
            <Link
              href="/tools"
              className="link-underline text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors hidden sm:inline"
            >
              工具库
            </Link>

            {/* 资源 · 课程 / 资料 */}
            <Link
              href="/courses"
              className="link-underline text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors hidden md:inline"
            >
              资源
            </Link>

            {/* 关于 */}
            <Link
              href="/about"
              className="link-underline text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
            >
              关于
            </Link>

            {/* 聊聊 · 按钮样式（转化入口） */}
            <Link
              href="/contact"
              className="font-mono text-xs px-3 py-1.5 border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors whitespace-nowrap"
            >
              聊聊 →
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
