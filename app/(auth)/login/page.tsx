'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({ 
        email: email, 
        password: password 
      })
      
      if (error) {
        alert('登录失败: ' + error.message)
        return
      }

      // ✅ 登录成功，跳转回根路径 '/' 触发智能显示
      router.push('/')
      router.refresh()
      
    } catch (err) {
      console.error('登录发生错误:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <form onSubmit={handleLogin} className="w-[400px] p-10 bg-white rounded-[32px] shadow-2xl space-y-6">
        <h1 className="text-3xl font-black text-blue-600 italic tracking-tighter mb-8">EPAY 登录</h1>
        
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="邮箱" 
            required
            className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-800"
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="密码" 
            required
            className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-800"
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-[0.98] transition-all ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? '登录中...' : '登 录'}
        </button>
        
        <p className="text-center text-sm text-slate-400">
          还没有账号？ <a href="/register" className="text-blue-600 font-bold">立即注册</a>
        </p>
      </form>
    </div>
  )
} // ✅ 确保最后这两个大括号都在！