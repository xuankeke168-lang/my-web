import NextAuth, { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

/**
 * NextAuth 配置
 * - 单人站：只允许 GitHub 账号 xuankeke168-lang 登录
 * - 其他人会拿到 403 错误页
 */
export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      const allowedUser = "xuankeke168-lang";
      const githubLogin = (profile as { login?: string } | undefined)?.login;
      return githubLogin === allowedUser;
    },
    async session({ session, token }) {
      // 把 GitHub login 暴露到 session
      if (session.user) {
        (session.user as { login?: string }).login =
          (token as { login?: string }).login;
      }
      return session;
    },
    async jwt({ token, profile }) {
      if (profile) {
        (token as { login?: string }).login = (profile as { login?: string })
          .login;
      }
      return token;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
