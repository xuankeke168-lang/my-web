import { signIn } from "next-auth/react";

interface LoginPageProps {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const { error, callbackUrl } = await searchParams;

  const errorMessages: Record<string, string> = {
    Forbidden: "你不是 owner，无权登录此后台",
    Configuration: "服务配置错误，请联系管理员",
    AccessDenied: "访问被拒绝",
    Verification: "验证失败",
    Default: "登录失败，请重试",
  };

  const errorText = error
    ? errorMessages[error] ?? errorMessages.Default
    : null;

  const callback = callbackUrl ?? "/admin";

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-zinc-50 dark:bg-black">
      <div className="max-w-md w-full">
        {/* Logo / 标题 */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500 mb-5 text-2xl">
            🔐
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            财务老登学AI · 后台
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            仅限 owner 登录 · 所有操作会被记录
          </p>
        </div>

        {/* 错误提示 */}
        {errorText && (
          <div className="mb-6 p-4 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 text-sm">
            ⚠️ {errorText}
          </div>
        )}

        {/* 登录卡片 */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 text-center">
            使用 GitHub 账号登录
          </p>

          {/* 简单链接触发 OAuth，避免 server action 复杂度 */}
          <a
            href={`/api/auth/signin/github?callbackUrl=${encodeURIComponent(callback)}`}
            className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>用 GitHub 登录</span>
          </a>
        </div>

        {/* 底部说明 */}
        <p className="text-xs text-zinc-400 text-center mt-6">
          登录即表示同意记录访问日志
        </p>
      </div>
    </div>
  );
}
