'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

interface SidebarProps {
  initialUser?: any; 
}

export default function Sidebar({ initialUser }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut(); 
    router.push('/'); 
    router.refresh();
  };

  const menu = [
    { name: '我的卡片', href: '/', icon: '💳' },
    { name: '我的钱包', href: '/wallet', icon: '👛' },
    { name: '账单记录', href: '/bill', icon: '📄' },
    { name: '推广赚钱', href: '/promoting', icon: '🚀' },
  ];

  return (
    <div className="flex flex-col h-screen p-8 bg-white border-r border-gray-100 fixed left-0 top-0 w-64 z-50">
      <div className="text-3xl font-black text-blue-600 italic mb-16 tracking-tighter">EPAY</div>
      
      <nav className="space-y-2 flex-1 overflow-y-auto">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 ml-3">系统功能</p>
        {menu.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-bold transition-all ${
              pathname === item.href 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
              : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
      
      <div className="mt-auto pt-6 border-t border-gray-100 space-y-2">
        {initialUser ? (
          <>
            <div className="px-3 py-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight mb-1">当前账户</p>
              <p className="text-xs font-bold text-gray-700 truncate">{initialUser.email}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-4 w-full px-4 py-3 text-red-400 font-bold hover:bg-red-50 hover:text-red-600 rounded-2xl transition-all text-sm"
            >
              <span>🚪</span> 退出登录
            </button>
          </>
        ) : (
          <Link 
            href="/login" 
            className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all mb-4"
          >
            登录 / 注册
          </Link>
        )}
        
        <Link 
          href="/setting" 
          className={`flex items-center gap-4 px-4 py-3 font-bold rounded-2xl transition-colors ${
            pathname === '/setting' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <span>⚙️</span> 系统设置
        </Link>
      </div>
    </div>
  )
}