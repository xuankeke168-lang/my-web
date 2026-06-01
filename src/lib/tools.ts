export interface Tool {
  id: string;
  name: string;
  description: string;
  coverGradient: string;
  platform: "windows" | "mac" | "linux" | "cross-platform";
  downloadUrl: string;
  version: string;
  fileSize: string;
  tags: string[];
  featured: boolean;
}

const tools: Tool[] = [
  {
    id: "doc-extractor",
    name: "文档智能抽取系统",
    description:
      "上传PDF/图片，AI自动识别提取文字内容，支持表格转Excel，适合财务、商务等文档处理场景",
    coverGradient: "from-blue-500 to-cyan-500",
    platform: "windows",
    downloadUrl: "https://github.com/yourusername/doc-extractor/releases",
    version: "1.0.0",
    fileSize: "约 200MB（含Python环境）",
    tags: ["AI识别", "文档处理", "PDF"],
    featured: true,
  },
];

export function getTools(): Tool[] {
  return tools;
}

export function getToolById(id: string): Tool | null {
  return tools.find((tool) => tool.id === id) || null;
}
