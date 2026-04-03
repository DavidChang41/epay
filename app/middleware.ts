import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // 检查是否有登录会话
  const { data: { session } } = await supabase.auth.getSession()

  // 如果没登录，且你想访问内页，就踢回登录页
  if (!session && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

// 这里的配置表示：除了静态资源，所有页面都要经过保安检查
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}