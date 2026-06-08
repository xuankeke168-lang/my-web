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
    id: "bi-zoro-ai-finance",
    title: "法 · AI业财分析（数道系列）",
    description:
      "与 CFO / 财务总监 对齐的业财融合课程：业财融合 + 预算规划 + 财务分析，专为财务数字化转型设计。",
    coverImage: "",
    platform: "BI佐罗（excel120.com）",
    affiliateUrl: "https://www.excel120.com/",
    originalPrice: 1999,
    currentPrice: 1499,
    rating: 4.9,
    enrollmentCount: 1800,
    tags: ["业财融合", "财务分析", "预算规划"],
    featured: false,
  },
  {
    id: "bi-zoro-ai-business-intelligence",
    title: "器 · AI商业智能（数道系列）",
    description:
      "与 CIO / IT 总监 对齐：DAX 原理 + 数据建模 + 性能优化，构建企业级 Power BI 数据平台。",
    coverImage: "",
    platform: "BI佐罗（excel120.com）",
    affiliateUrl: "https://www.excel120.com/",
    originalPrice: 1999,
    currentPrice: 1499,
    rating: 4.8,
    enrollmentCount: 1500,
    tags: ["Power BI", "DAX", "数据建模"],
    featured: false,
  },
  {
    id: "bi-zoro-ai-commander",
    title: "智 · AI全能指挥官体系",
    description:
      "全员必修：建立 AI 思维，掌握智能体协作范式，让业务人掌控 AI，释放重复劳动。",
    coverImage: "",
    platform: "BI佐罗（excel120.com）",
    affiliateUrl: "https://www.excel120.com/",
    originalPrice: 999,
    currentPrice: 699,
    rating: 4.9,
    enrollmentCount: 3200,
    tags: ["AI思维", "智能体", "提效"],
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
