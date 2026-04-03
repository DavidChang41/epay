import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) { return request.cookies.get(name)?.value },
        set(name, value, options) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name, options) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const url = request.nextUrl.clone()

  // 1. 登录/注册重定向
  if (user && (url.pathname === '/login' || url.pathname === '/register')) {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  // 2. 保护路径拦截 (新增 /admin)
  const protectedPaths = ['/bill', '/setting', '/wallet', '/admin']
  if (!user && protectedPaths.some(p => url.pathname.startsWith(p))) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: ['/', '/login', '/register', '/bill/:path*', '/setting/:path*', '/wallet/:path*', '/admin/:path*'],
}