import { withAuth } from "next-auth/middleware";

/**
 * 保护 /admin/* 路由
 * - /admin/login 放行（要让人能进登录页）
 * - 其他 /admin/* 未登录 → 自动跳 GitHub OAuth
 * - 登录但不是 owner → 跳 /admin/login?error=Forbidden
 */
export default withAuth(
  function middleware() {
    return;
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // 登录页放行
        if (req.nextUrl.pathname === "/admin/login") {
          return true;
        }
        // 其他路由要 token
        return !!token;
      },
    },
    pages: {
      signIn: "/admin/login",
      error: "/admin/login",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
