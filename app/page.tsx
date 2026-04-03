import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import LandingPage from '@/components/LandingPage'
import DashboardContent from '@/components/DashboardContent'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name) { return cookieStore.get(name)?.value } } }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // 未登录显示官网
  if (!session) {
    return <LandingPage />
  }

  // 已登录显示用户前台后台
  return <DashboardContent user={session.user} />
}