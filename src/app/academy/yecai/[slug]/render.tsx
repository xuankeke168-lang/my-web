/**
 * 业财融合专题 - 块渲染器
 * 渲染从 scripts/parse-yecai-html.py 生成的结构化数据。
 * 所有 inline HTML（如 <strong>）通过 dangerouslySetInnerHTML 渲染，
 * 源数据来自我们自己维护的业财融合知识库，可控可审计。
 */
import type { ContentBlock } from "@/data/yecai/types";

interface RenderProps {
  blocks: ContentBlock[];
}

function InlineHTML({ html }: { html: string }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

function TableBlock({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  if (rows.length === 0 && headers.length === 0) return null;
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        {headers.length > 0 && (
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-2 text-left font-semibold text-zinc-900 dark:text-white"
                >
                  <InlineHTML html={h} />
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className="even:bg-zinc-50 dark:even:bg-zinc-900/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10"
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-zinc-800 dark:text-zinc-200"
                >
                  <InlineHTML html={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "header":
      return (
        <div className="my-8 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/10 p-6 md:p-8">
          {block.breadcrumb && (
            <div className="text-xs text-emerald-700 dark:text-emerald-300 mb-3 tracking-wide">
              {block.breadcrumb}
            </div>
          )}
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            {block.title}
          </h1>
          {block.subtitle && (
            <p className="text-base md:text-lg text-emerald-700 dark:text-emerald-300 italic mb-4">
              {block.subtitle}
            </p>
          )}
          {block.meta.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {block.meta.map((m, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 rounded-full bg-white/60 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                >
                  {m}
                </span>
              ))}
            </div>
          )}
        </div>
      );

    case "learning_info":
      return (
        <div className="my-6 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/60 dark:bg-blue-900/10 p-5">
          {block.meta.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-4">
              {block.meta.map((m, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="text-lg">{m.icon}</span>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {m.label}
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}
          {block.objectives.length > 0 && (
            <div>
              <div className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                学习目标
              </div>
              <ul className="list-disc list-inside text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
                {block.objectives.map((o, i) => (
                  <li key={i}>
                    <InlineHTML html={o} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );

    case "h2":
      return (
        <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white mt-10 mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-700">
          {block.text}
        </h2>
      );

    case "h3":
      return (
        <h3 className="text-lg md:text-xl font-semibold text-zinc-900 dark:text-white mt-7 mb-3">
          {block.text}
        </h3>
      );

    case "h4":
      return (
        <h4 className="text-base md:text-lg font-semibold text-zinc-900 dark:text-white mt-5 mb-2">
          {block.text}
        </h4>
      );

    case "p":
      return (
        <p className="text-zinc-800 dark:text-zinc-200 leading-7 my-3">
          <InlineHTML html={block.html} />
        </p>
      );

    case "ul":
      return (
        <ul className="list-disc list-outside ml-6 my-3 space-y-1.5 text-zinc-800 dark:text-zinc-200 leading-7">
          {block.items.map((item, i) => (
            <li key={i}>
              <InlineHTML html={item} />
            </li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol className="list-decimal list-outside ml-6 my-3 space-y-1.5 text-zinc-800 dark:text-zinc-200 leading-7">
          {block.items.map((item, i) => (
            <li key={i}>
              <InlineHTML html={item} />
            </li>
          ))}
        </ol>
      );

    case "table":
      return <TableBlock headers={block.headers} rows={block.rows} />;

    case "blockquote":
      return (
        <blockquote className="my-5 border-l-4 border-blue-500 bg-zinc-50 dark:bg-zinc-800/50 pl-5 pr-4 py-3 italic text-zinc-700 dark:text-zinc-300">
          <InlineHTML html={block.html} />
        </blockquote>
      );

    case "pre":
      return (
        <pre className="my-5 overflow-x-auto rounded-lg bg-zinc-900 dark:bg-black text-zinc-100 p-4 text-xs leading-relaxed font-mono whitespace-pre">
          {block.text}
        </pre>
      );

    case "key_point":
      return (
        <div className="my-5 rounded-xl border border-cyan-300 dark:border-cyan-800/60 bg-cyan-50/60 dark:bg-cyan-900/10 p-5">
          {block.title && (
            <h4 className="text-cyan-800 dark:text-cyan-300 font-semibold mb-2 text-sm uppercase tracking-wide">
              💡 {block.title}
            </h4>
          )}
          <div className="text-zinc-800 dark:text-zinc-200 leading-7">
            <InlineHTML html={block.html} />
          </div>
        </div>
      );

    case "finance_box":
      return (
        <div className="my-5 rounded-xl border border-amber-300 dark:border-amber-800/60 bg-amber-50/60 dark:bg-amber-900/10 p-5">
          {block.title && (
            <h4 className="text-amber-800 dark:text-amber-300 font-semibold mb-2 text-sm uppercase tracking-wide">
              💰 {block.title}
            </h4>
          )}
          <div className="text-zinc-800 dark:text-zinc-200 leading-7">
            <InlineHTML html={block.html} />
          </div>
        </div>
      );

    case "case_box":
      return (
        <div className="my-5 rounded-xl border border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/60 dark:bg-emerald-900/10 p-5">
          {block.title && (
            <h4 className="text-emerald-800 dark:text-emerald-300 font-semibold mb-2 text-sm uppercase tracking-wide">
              📋 {block.title}
            </h4>
          )}
          <div className="text-zinc-800 dark:text-zinc-200 leading-7">
            <InlineHTML html={block.html} />
          </div>
        </div>
      );

    case "article_nav":
      if (!block.prev && !block.next) return null;
      return (
        <nav className="my-10 flex flex-col sm:flex-row gap-3 justify-between border-t border-zinc-200 dark:border-zinc-700 pt-6">
          {block.prev ? (
            <a
              href="#"
              className="text-sm px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:border-blue-400 dark:hover:border-blue-600 transition-colors flex-1"
            >
              ← {block.prev}
            </a>
          ) : (
            <span className="flex-1" />
          )}
          {block.next ? (
            <a
              href="#"
              className="text-sm px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:border-blue-400 dark:hover:border-blue-600 transition-colors flex-1 text-right"
            >
              {block.next} →
            </a>
          ) : (
            <span className="flex-1" />
          )}
        </nav>
      );

    case "footer":
      return (
        <div className="my-8 pt-6 border-t border-zinc-200 dark:border-zinc-700 text-sm text-zinc-500 dark:text-zinc-500 text-center">
          <InlineHTML html={block.html} />
        </div>
      );

    default:
      return null;
  }
}

export default function YecaiRenderer({ blocks }: RenderProps) {
  return (
    <article className="space-y-1">
      {blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </article>
  );
}
