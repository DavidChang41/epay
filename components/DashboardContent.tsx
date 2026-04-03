'use client'
import Sidebar from './Sidebar'

interface DashboardProps {
  user?: any; // 接收来自 Page 的用户对象
}

export default function DashboardContent({ user }: DashboardProps) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* 左侧：固定侧边栏，直接传入用户数据以防闪烁 */}
      <aside className="w-64 flex-shrink-0 fixed h-full z-20">
        <Sidebar initialUser={user} />
      </aside>

      {/* 右侧：主内容区 */}
      <main className="flex-1 ml-64 p-10">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">控制面板</h1>
        </header>

        <div className="max-w-5xl space-y-10">
          {/* 账户余额卡片 */}
          <div className="relative overflow-hidden p-10 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-[40px] shadow-2xl shadow-blue-100">
             <div className="relative z-10">
                <p className="text-blue-100 font-bold uppercase tracking-wider text-xs">账户总余额 (USD)</p>
                <h2 className="text-6xl font-black mt-4 tracking-tighter">$ 0.00</h2>
             </div>
             <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          {/* 我的卡片区 */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-slate-800">我的卡片</h3>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all">
                + 申请新卡
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="aspect-[1.6/1] rounded-[36px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 bg-white/50">
                  <span className="text-5xl mb-4">💳</span>
                  <p className="font-bold text-lg">暂无可用的虚拟卡</p>
               </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}