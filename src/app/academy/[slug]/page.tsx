import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts, type BlogPost } from "@/lib/blog";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import ReadingToolbar from "@/components/ReadingToolbar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "文章未找到" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function AcademyPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Back button */}
        <Link
          href="/academy"
          className="inline-flex items-center text-sm text-[var(--zinc-soft)] hover:text-[var(--ink)] link-underline mb-8"
        >
          ← 回到成长记录
        </Link>

        {/* Article */}
        <article className="bg-white dark:bg-zinc-900 rounded-2xl p-8 md:p-12 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          {/* Header */}
          <header className="mb-10 pb-8 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-500 mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 font-medium">
                {post.category}
              </span>
              <span>·</span>
              <time dateTime={post.date}>{post.date}</time>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-5 leading-tight">
              {post.title}
            </h1>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Content · 衬线字体 + 排版优化 */}
          <div className="prose-article">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* Comments Placeholder */}
        <div className="mt-12 bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
            💬 评论
          </h3>
          <p className="text-zinc-500 dark:text-zinc-500 text-sm">
            评论功能开发中，欢迎去
            <Link
              href="https://github.com/xuankeke168-lang/my-web"
              className="text-amber-600 dark:text-amber-400 link-underline mx-1"
              target="_blank"
              rel="noopener"
            >
              GitHub
            </Link>
            提 issue。
          </p>
        </div>
      </div>

      {/* 悬浮工具条 · Client Component */}
      <ReadingToolbar content={post.content} title={post.title} />
    </div>
  );
}
