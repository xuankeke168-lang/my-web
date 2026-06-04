// 业财融合专题内容块类型定义

export type InlineHtml = string;

export type ContentBlock =
  | { type: "header"; title: string; subtitle: string; meta: string[]; breadcrumb: string }
  | { type: "learning_info"; meta: Array<{ icon: string; label: string; value: string }>; objectives: string[] }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "h4"; text: string }
  | { type: "p"; html: InlineHtml }
  | { type: "ul"; items: InlineHtml[] }
  | { type: "ol"; items: InlineHtml[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "blockquote"; html: InlineHtml }
  | { type: "pre"; text: string }
  | { type: "key_point"; title: string; html: InlineHtml }
  | { type: "finance_box"; title: string; html: InlineHtml }
  | { type: "case_box"; title: string; html: InlineHtml }
  | { type: "article_nav"; prev: string | null; next: string | null; prev_href: string | null; next_href: string | null }
  | { type: "footer"; html: InlineHtml };
