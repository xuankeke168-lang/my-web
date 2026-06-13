/**
 * 后台 layout
 *
 * 只做"壳子"，不做 auth check。
 * 原因：如果在 layout 里做 redirect，/admin/login 也会跑，
 *       然后未登录跳 /admin/login → 死循环。
 *
 * 实际 auth check 在：
 * - middleware.ts（粗粒度，未登录跳登录页）
 * - /admin/page.tsx（细粒度，登录但不是 owner 跳错误页）
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
