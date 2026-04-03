'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    // 在这里接入你的 Supabase 注册逻辑
    console.log('注册信息:', { email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="w-full max-w-[440px] p-10 bg-white rounded-[40px] shadow-2xl shadow-blue-100 border border-white">
        
        {/* 顶部标题 */}
        <div className="mb-8">
          <div className="text-3xl font-black text-blue-600 italic tracking-tighter mb-2">EPAY</div>
          <p className="text-slate-400 font-bold text-sm">创建您的全球支付账户</p>
        </div>

        {/* 修复后的表单：恢复了输入框逻辑 */}
        <form onSubmit={handleRegister} className="space-y-4">
          <input 
            type="email" 
            placeholder="邮箱地址 (登录名)" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
            required
          />
          <input 
            type="password" 
            placeholder="设置密码" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
            required
          />
          <div className="flex gap-3">
             <input type="text" placeholder="验证码" className="flex-1 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium" />
             <div className="w-28 bg-blue-50 rounded-2xl flex items-center justify-center font-bold text-blue-600 border border-blue-100">N5ZQ</div>
          </div>
          
          <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all mt-2">
            注 册
          </button>
        </form>

        {/* 底部切换链接 */}
        <div className="mt-8 pt-6 border-t border-slate-50 text-center">
          <p className="text-slate-400 font-bold text-sm">
            已经有账号了？{' '}
            <Link href="/login" className="text-blue-600 hover:underline underline-offset-4 font-black">
              立即登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}