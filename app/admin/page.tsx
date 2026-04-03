'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalDeposit: 0, logs: [] as any[] });
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function checkAuthAndFetchData() {
      const { data: { session } } = await supabase.auth.getSession();
      
      // 权限校验：如果是管理员则继续，否则踢回首页
      if (!session || !session.user.email?.endsWith('@sohu.com')) {
        router.replace('/'); 
        return;
      }

      setIsAdmin(true);

      try {
        const { count } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
        const { data: tx, error } = await supabase.from('transactions').select('*').eq('type', 'topup').order('created_at', { ascending: false });
        if (error) throw error;
        const total = tx?.reduce((sum, item) => sum + Number(item.amount), 0) || 0;
        setStats({ totalUsers: count || 0, totalDeposit: total, logs: tx || [] });
      } catch (err) {
        console.error('Data Load Error:', err);
      } finally {
        setLoading(false);
      }
    }
    checkAuthAndFetchData();
  }, [supabase, router]);

  if (loading) return <div className="p-10 text-slate-400 font-black animate-pulse">系统校验中...</div>;
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex">
      {/* 管理员专属侧边栏 - 区别于普通用户 */}
      <div className="w-64 bg-slate-900 text-white p-8 flex flex-col">
        <div className="text-2xl font-black italic text-blue-400 mb-10">EPAY ADMIN</div>
        <nav className="space-y-4 flex-1">
          <Link href="/admin" className="block p-4 bg-blue-600 rounded-2xl font-bold">数据总览</Link>
          <Link href="/admin/users" className="block p-4 hover:bg-white/5 rounded-2xl font-bold transition-all">用户管理</Link>
          <Link href="/admin/cards" className="block p-4 hover:bg-white/5 rounded-2xl font-bold transition-all">卡片监控</Link>
          <Link href="/" className="block p-4 text-slate-500 hover:text-white mt-10 text-sm">返回前台首页</Link>
        </nav>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 p-10 overflow-y-auto">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-slate-800">控制面板</h1>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Global System Overview</p>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-8 mb-10">
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
            <p className="text-slate-400 font-black text-xs uppercase mb-2">平台总用户</p>
            <p className="text-5xl font-black text-slate-900">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
            <p className="text-slate-400 font-black text-xs uppercase mb-2">累计入金 (USD)</p>
            <p className="text-5xl font-black text-blue-600">${stats.totalDeposit.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100">
          <h2 className="text-xl font-black text-slate-800 mb-8">最新入金流水</h2>
          <table className="w-full">
            <thead>
              <tr className="text-slate-400 text-[10px] font-black uppercase border-b border-slate-50">
                <th className="pb-6 text-left">交易ID</th>
                <th className="pb-6 text-left">金额</th>
                <th className="pb-6 text-left">时间</th>
              </tr>
            </thead>
            <tbody>
              {stats.logs.map((log, i) => (
                <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-all">
                  <td className="py-6 font-mono text-sm text-slate-400">#{log.id?.slice(0,8)}</td>
                  <td className="py-6 font-black text-slate-900">${Number(log.amount).toFixed(2)}</td>
                  <td className="py-6 text-sm text-slate-400">{new Date(log.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}