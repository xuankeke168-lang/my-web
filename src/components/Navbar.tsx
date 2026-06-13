import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/90 dark:bg-black/90 backdrop-blur-md border-b border-[var(--line)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-baseline gap-2 text-base font-semibold text-[var(--ink)] hover:text-[var(--amber)] transition-colors whitespace-nowrap"
          >
            <span className="font-mono text-xs text-[var(--zinc-soft)]">
              #001
            </span>
            <span>财务老登学AI</span>
          </Link>

          <div className="flex items-center gap-5 lg:gap-7 text-sm">
            <Link
              href="/"
              className="link-underline text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
            >
              日记
            </Link>
            <Link
              href="/academy"
              className="link-underline text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
            >
              成长记录
            </Link>
            <Link
              href="/tools"
              className="link-underline text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors hidden sm:inline"
            >
              工具
            </Link>
            <Link
              href="/courses"
              className="link-underline text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors hidden md:inline"
            >
              资源
            </Link>
            <Link
              href="/about"
              className="link-underline text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
            >
              关于老登
            </Link>
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
