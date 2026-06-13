import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_NAME = "财务老登学AI";
const SITE_TITLE =
  "财务老登学AI · 一个真诚的财务老登快乐学习 AI 的成长日记";
const SITE_DESCRIPTION =
  "一个 10+ 年财务人，正在认真学 AI 怎么用。把今天又进步一点点的过程记录下来，顺便用 AI 解决真实问题。";
const SITE_KEYWORDS = [
  "财务老登",
  "财务学AI",
  "AI 财务应用",
  "AI 工具推荐",
  "AI 学习方法",
  "ChatGPT 财务",
  "Claude 财务",
  "AI 财务案例",
  "财务人成长",
  "职场 AI 工具",
  "个人成长日记",
];

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
