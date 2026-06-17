import { NextResponse } from "next/server";

interface VarStatus {
  exists: boolean;
  length: number;
  preview: string;
  looksValid: boolean;
}

function checkVar(name: string, value: string | undefined): VarStatus {
  const exists = Boolean(value);
  const length = value?.length ?? 0;
  const preview = value ? `${value.slice(0, 4)}...${value.slice(-4)}` : "EMPTY";

  let looksValid = false;
  if (name === "GITHUB_ID") {
    looksValid = exists && length >= 10;
  } else if (name === "GITHUB_SECRET") {
    looksValid = exists && length >= 20;
  } else if (name === "GITHUB_TOKEN") {
    looksValid = exists && length >= 20;
  } else if (name === "NEXTAUTH_SECRET") {
    looksValid = exists && length >= 32;
  } else if (name === "NEXTAUTH_URL") {
    looksValid = exists && value!.startsWith("https://");
  }

  return { exists, length, preview, looksValid };
}

/**
 * 临时 debug endpoint
 * 只检查 env var 是否存在 + 长度，不打印值
 * 修好登录后删除
 */
export async function GET() {
  const report: Record<string, VarStatus> = {
    GITHUB_ID: checkVar("GITHUB_ID", process.env.GITHUB_ID),
    GITHUB_SECRET: checkVar("GITHUB_SECRET", process.env.GITHUB_SECRET),
    GITHUB_TOKEN: checkVar("GITHUB_TOKEN", process.env.GITHUB_TOKEN),
    NEXTAUTH_SECRET: checkVar("NEXTAUTH_SECRET", process.env.NEXTAUTH_SECRET),
    NEXTAUTH_URL: checkVar("NEXTAUTH_URL", process.env.NEXTAUTH_URL),
  };

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    env: report,
  });
}
