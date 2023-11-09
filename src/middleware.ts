import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// 미들웨어는 라우터에 접근하기 전에 미리 실행되는 함수, 라우터 - 컨트롤러 사이에서 동작함

// 페이지에서만 동작하는 미들웨어
// export { default } from 'next-auth/middleware';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req }); // 토큰을 가져옴

  if (!token) {
    // 로그인한 사용자가 아님
    if (req.nextUrl.pathname.startsWith('/api')) {
      return new NextResponse('Authentication Error', { status: 401 }); // 라우터 핸들러까지 도달하지 않고 바로 응답을 보냄
    }

    const { pathname, search, origin, basePath } = req.nextUrl;
    const signInUrl = new URL(`${basePath}/auth/signin`, origin);
    signInUrl.searchParams.append(
      'callbackUrl',
      `${basePath}${pathname}${search}`
    );
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/new',
    '/',
    '/api/bookmarks',
    '/api/comments',
    '/api/likes',
    '/api/follow',
    '/api/me',
    '/api/posts/:path*'
  ] // matcher: 미들웨어가 동작할 경로를 지정
};
