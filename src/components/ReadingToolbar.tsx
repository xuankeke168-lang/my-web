"use client";

import { useEffect, useState } from "react";

interface ReadingToolbarProps {
  content: string;
  title: string;
}

export default function ReadingToolbar({ content, title }: ReadingToolbarProps) {
  const [showBackTop, setShowBackTop] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    // 监听滚动，显示/隐藏回到顶部按钮
    const onScroll = () => {
      setShowBackTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // 检测深色模式偏好
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mq.matches);
  }, []);

  const handleCopy = async () => {
    const text = `# ${title}\n\n${content}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 降级：选中让用户手动复制
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title,
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        /* 用户取消 */
      }
    } else {
      // 降级：复制链接
      try {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        /* ignore */
      }
    }
  };

  const handleBackTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed right-4 md:right-6 bottom-6 z-40 flex flex-col gap-2 animate-fade-in-up">
      {/* 复制按钮 */}
      <button
        onClick={handleCopy}
        className="w-11 h-11 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-md hover:shadow-lg hover:border-amber-500 dark:hover:border-amber-500 transition-all flex items-center justify-center text-zinc-600 dark:text-zinc-300 group"
        title={copied ? "已复制" : "复制全文"}
      >
        {copied ? (
          <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:text-amber-600"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        )}
      </button>

      {/* 分享按钮 */}
      <button
        onClick={handleShare}
        className="w-11 h-11 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-md hover:shadow-lg hover:border-amber-500 dark:hover:border-amber-500 transition-all flex items-center justify-center text-zinc-600 dark:text-zinc-300"
        title="分享"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16 6 12 2 8 6" />
          <line x1="12" x2="12" y1="2" y2="15" />
        </svg>
      </button>

      {/* 回到顶部 */}
      {showBackTop && (
        <button
          onClick={handleBackTop}
          className="w-11 h-11 rounded-full bg-amber-500 hover:bg-amber-600 shadow-md hover:shadow-lg transition-all flex items-center justify-center text-white animate-fade-in-up"
          title="回到顶部"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
}
