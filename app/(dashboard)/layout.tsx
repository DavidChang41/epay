import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Sidebar from '@/components/Sidebar'

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  // 在服务端获取一次用户信息
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* ✅ 统一在这里传入 initialUser，确保所有子页面加载时 Sidebar 都有数据 */}
      <aside className="w-64 flex-shrink-0 fixed h-full z-20">
        <Sidebar initialUser={session?.user} />
      </aside>

      <main className="flex-1 ml-64">
        {children}
      </main>
    </div>
  )
}