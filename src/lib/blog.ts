import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
}

function formatDate(value: unknown): string {
  if (!value) return '';
  if (value instanceof Date) {
    const y = value.getFullYear();
    const m = String(value.getMonth() + 1).padStart(2, '0');
    const d = String(value.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  return String(value);
}

function stripSlugExt(s: string): string {
  return s.replace(/\.md$/, '');
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const inputSlug = stripSlugExt(slug);
    // 先按 input slug 在目录里找（直接拼文件名）
    let fullPath = path.join(blogDirectory, `${inputSlug}.md`);
    if (!fs.existsSync(fullPath)) {
      // 找不到则扫一遍 frontmatter.slug 匹配
      const all = fs.readdirSync(blogDirectory);
      const matched = all.find((file) => {
        try {
          const raw = fs.readFileSync(path.join(blogDirectory, file), 'utf8');
          const { data } = matter(raw);
          return stripSlugExt(file) === inputSlug || data.slug === inputSlug;
        } catch {
          return false;
        }
      });
      if (!matched) return null;
      fullPath = path.join(blogDirectory, matched);
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const filenameSlug = stripSlugExt(path.basename(fullPath));

    return {
      slug: (data.slug as string) || filenameSlug,
      title: (data.title as string) || '',
      date: formatDate(data.date),
      category: (data.category as string) || '',
      tags: (data.tags as string[]) || [],
      excerpt: content.slice(0, 150).replace(/[#*\n]/g, '') + '...',
      content,
    };
  } catch (error) {
    return null;
  }
}

export function getAllPosts(): BlogPost[] {
  const slugs = fs.readdirSync(blogDirectory);
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}
