import { NextResponse } from "next/server";

interface VarStatus {
  exists: boolean;
  rawLength: number;
  trimLength: number;
  hasWhitespace: boolean;
  preview: string;
  looksValid: boolean;
  charsValid: boolean;
  issue?: string;
}

function checkVar(name: string, value: string | undefined): VarStatus {
  const exists = Boolean(value);
  const rawLength = value?.length ?? 0;
  const trimmed = value?.trim() ?? "";
  const trimLength = trimmed.length;
  const hasWhitespace = value !== trimmed;
  const preview = value
    ? `${value.slice(0, 4)}...${value.slice(-4)}`
    : "EMPTY";

  let looksValid = false;
  let charsValid = false;
  let issue: string | undefined;

  if (name === "GITHUB_ID") {
    // GitHub OAuth App client_id 永远以 "Ov23li" 开头，长度 20
    const re = /^Ov23li[A-Za-z0-9]{14}$/;
    charsValid = re.test(trimmed);
    looksValid = exists && charsValid && !hasWhitespace;
    if (!looksValid) {
      if (hasWhitespace) issue = "⚠️ 末尾/开头有空格或换行！";
      else if (!charsValid) issue = "⚠️ 不像 GitHub client_id（应以 Ov23li 开头，长度 20）";
    }
  } else if (name === "GITHUB_SECRET") {
    // GitHub OAuth App client_secret 是 40 字符 hex（小写 a-f）
    const re = /^[a-f0-9]{40}$/;
    charsValid = re.test(trimmed);
    looksValid = exists && charsValid && !hasWhitespace;
    if (!looksValid) {
      if (hasWhitespace) issue = "⚠️ 末尾/开头有空格或换行！";
      else if (!charsValid) issue = "⚠️ 不是 40 字符 hex（GitHub client_secret 标准格式）";
    }
  } else if (name === "GITHUB_TOKEN") {
    // GitHub PAT: ghp_xxx (classic) 或 github_pat_xxx (fine-grained)
    const re = /^(ghp_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{82,})$/;
    charsValid = re.test(trimmed);
    looksValid = exists && charsValid && !hasWhitespace;
    if (!looksValid) {
      if (hasWhitespace) issue = "⚠️ 末尾/开头有空格或换行！";
      else if (!charsValid) issue = "⚠️ 不像 GitHub PAT（应以 ghp_ 或 github_pat_ 开头）";
    }
  } else if (name === "NEXTAUTH_SECRET") {
    // NextAuth secret：base64 编码 32 字节 = 44 字符
    const re = /^[A-Za-z0-9+/]{43}=$/;
    charsValid = re.test(trimmed);
    looksValid = exists && charsValid && !hasWhitespace;
    if (!looksValid) {
      if (hasWhitespace) issue = "⚠️ 末尾/开头有空格或换行！";
      else if (!charsValid) issue = "⚠️ 不是 base64 44 字符（应为 base64(32bytes) = 44 字符）";
    }
  } else if (name === "NEXTAUTH_URL") {
    charsValid = /^https:\/\/.+/.test(trimmed);
    looksValid = exists && charsValid && !hasWhitespace;
    if (!looksValid) {
      if (hasWhitespace) issue = "⚠️ 末尾/开头有空格或换行！";
      else if (!charsValid) issue = "⚠️ 应以 https:// 开头";
    }
  }

  return {
    exists,
    rawLength,
    trimLength,
    hasWhitespace,
    preview,
    looksValid,
    charsValid,
    issue,
  };
}

/**
 * 临时 debug endpoint
 * 检查 env var 是否存在 + 长度 + 字符集 + 是否含空白字符
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

  // 找出第一个 issue 优先显示
  const firstIssue = Object.entries(report).find(([, v]) => v.issue);

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    firstIssue: firstIssue ? { var: firstIssue[0], issue: firstIssue[1].issue } : null,
    env: report,
  });
}
