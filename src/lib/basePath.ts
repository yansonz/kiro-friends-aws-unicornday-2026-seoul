// GitHub Pages basePath 처리
export const basePath =
  process.env.NODE_ENV === 'production'
    ? '/kiro-friends-aws-unicornday-2026-seoul'
    : '';

// 이미지 경로에 basePath 추가
export function withBasePath(path: string): string {
  return `${basePath}${path}`;
}
