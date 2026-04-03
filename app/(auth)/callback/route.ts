import { createRouteHandlerServer } from '@supabase/auth-helpers-nextjs' // 第 1 行
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    // 下面这一行必须同步修改为 Server 版本
    const supabase = createRouteHandlerServer({ cookies }) // 第 10 行
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(requestUrl.origin)
}