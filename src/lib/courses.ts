export interface Course {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  platform: string;
  affiliateUrl: string;
  originalPrice: number;
  currentPrice: number;
  rating: number;
  enrollmentCount: number;
  tags: string[];
  featured: boolean;
}

const courses: Course[] = [
  {
    id: "claude-code-learning-path",
    title: "Claude Code + AI 编程学习路径",
    description: "零基础入门，6大模块45节课，系统学习Claude Code + AI辅助编程",
    coverImage: "",
    platform: "aiking.dev",
    affiliateUrl: "https://www.aiking.dev/courses",
    originalPrice: 999,
    currentPrice: 699,
    rating: 4.9,
    enrollmentCount: 3200,
    tags: ["Claude Code", "AI编程", "零基础"],
    featured: true,
  },
  {
    id: "ai-office-productivity",
    title: "AI智能办公实战营",
    description:
      "ChatGPT、Claude等AI工具在财务办公中的综合应用，提升数据处理与报表分析效率",
    coverImage: "",
    platform: "网易云课堂",
    affiliateUrl: "https://study.163.com/course/courseMain.htm?cid=1201418805",
    originalPrice: 599,
    currentPrice: 399,
    rating: 4.8,
    enrollmentCount: 15800,
    tags: ["AI办公", "财务效率", "智能工具"],
    featured: true,
  },
  {
    id: "data-analysis-ai",
    title: "AI数据分析与可视化",
    description:
      "用AI工具快速处理财务数据，从数据清洗到可视化报表，效率提升10倍",
    coverImage: "",
    platform: "网易云课堂",
    affiliateUrl: "https://study.163.com/course/courseMain.htm?cid=1201424801",
    originalPrice: 799,
    currentPrice: 499,
    rating: 4.9,
    enrollmentCount: 8900,
    tags: ["数据分析", "AI工具", "可视化"],
    featured: false,
  },
  {
    id: "excel-ai-automation",
    title: "Excel AI自动化与函数进阶",
    description: "AI辅助下的Excel高级函数、数据透视表与财务建模实战",
    coverImage: "",
    platform: "网易云课堂",
    affiliateUrl: "https://study.163.com/course/courseMain.htm?cid=1201436802",
    originalPrice: 499,
    currentPrice: 299,
    rating: 4.7,
    enrollmentCount: 22000,
    tags: ["Excel", "AI自动化", "财务建模"],
    featured: false,
  },
];

const DATA_SOURCE = process.env.COURSES_DATA_SOURCE ?? "local";

export async function getCourses(): Promise<Course[]> {
  if (DATA_SOURCE === "api") {
    // Phase 2: 从联盟平台 API 获取
    // return fetchFromAffiliateAPI();
  }
  return courses;
}

export async function getCourseById(id: string): Promise<Course | null> {
  const all = await getCourses();
  return all.find((c) => c.id === id) || null;
}
