"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface DropdownItem {
  label: string;
  href: string;
  icon: string;
  desc: string;
}

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
  allHref: string;
  allLabel: string;
}

export default function NavDropdown({
  label,
  items,
  allHref,
  allLabel,
}: NavDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // 点击外部关闭
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", onClickOutside);
      return () => document.removeEventListener("mousedown", onClickOutside);
    }
  }, [open]);

  // ESC 关闭
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="link-underline inline-flex items-center gap-1 text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
      >
        {label}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown 面板 */}
      {open && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg overflow-hidden animate-fade-in-up z-50"
          role="menu"
        >
          <div className="p-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                role="menuitem"
                className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors group"
              >
                <span className="text-xl mt-0.5">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-zinc-900 dark:text-white text-sm group-hover:text-amber-600 dark:group-hover:text-amber-400">
                    {item.label}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">
                    {item.desc}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 底部分割线 + 看全部 */}
          <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
            <Link
              href={allHref}
              onClick={() => setOpen(false)}
              className="block px-4 py-2.5 text-sm text-amber-600 dark:text-amber-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-center font-medium"
            >
              {allLabel} →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
