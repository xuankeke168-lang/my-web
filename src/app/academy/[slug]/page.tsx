import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function AcademyPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const renderMarkdown = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, index) => {
      if (line.startsWith("# ")) {
        return (
          <h1
            key={index}
            className="text-3xl font-bold text-zinc-900 dark:text-white mt-8 mb-4"
          >
            {line.slice(2)}
          </h1>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4"
          >
            {line.slice(2)}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-3"
          >
            {line.slice(3)}
          </h3>
        );
      }
      if (line.startsWith("> ")) {
        return (
          <blockquote
            key={index}
            className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
          >
            {line.slice(2)}
          </blockquote>
        );
      }
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-4 text-zinc-700 dark:text-zinc-300">
            {line.slice(2)}
          </li>
        );
      }
      if (line.trim() === "") {
        return <br key={index} />;
      }
      return (
        <p key={index} className="text-zinc-700 dark:text-zinc-300 my-2">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Back button */}
        <Link
          href="/academy"
          className="inline-flex items-center text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8"
        >
          ← 返回AI学院
        </Link>

        {/* Article */}
        <article className="bg-white dark:bg-zinc-800 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-700">
          {/* Header */}
          <div className="mb-8 pb-8 border-b border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-500 mb-4">
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                {post.category}
              </span>
              <span>·</span>
              <span>{post.date}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">{renderMarkdown(post.content)}</div>
        </article>

        {/* Comments Placeholder */}
        <div className="mt-12 bg-white dark:bg-zinc-800 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-700">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
            评论
          </h3>
          <p className="text-zinc-500 dark:text-zinc-500">评论功能即将上线～</p>
        </div>
      </div>
    </div>
  );
}
