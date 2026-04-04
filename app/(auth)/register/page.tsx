'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captchaInput, setCaptchaInput] = useState('') // 用户输入的验证码
    const [currentCaptcha, setCurrentCaptcha] = useState('') // 随机生成的验证码
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    // 初始化 Supabase 客户端
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // 生成随机 4 位验证码
    const generateCaptcha = () => {
        const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
        let result = ''
        for (let i = 0; i < 4; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        setCurrentCaptcha(result)
    }

    // 初始化加载验证码
    useEffect(() => {
        generateCaptcha()
    }, [])

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        
        // 1. 验证码校验
        if (captchaInput.toUpperCase() !== currentCaptcha) {
            setMessage('错误：验证码输入不正确')
            generateCaptcha()
            return
        }

        setLoading(true)
        setMessage('')

        // 2. 执行注册
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) {
            setMessage(`注册失败: ${error.message}`)
            setLoading(false)
            generateCaptcha()
            return
        }

        // 3. 跳转逻辑
        // 如果 Supabase 关闭了邮箱验证，data 会包含 session
        if (data?.session) {
            setMessage('注册成功！正在进入主页...')
            setTimeout(() => {
                // 因为你的首页在 (guest) 目录下，所以直接跳到根路径
                window.location.href = '/' 
            }, 1000)
        } else {
            // 如果没关闭验证，依然提示检查邮箱
            setMessage('注册成功！请检查您的邮箱以确认账户。')
        }
        
        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
            <div className="w-full max-w-[440px] p-10 bg-white rounded-[40px] shadow-2xl shadow-blue-100 border border-white">
                <div className="mb-8">
                    <div className="text-3xl font-black text-blue-600 italic tracking-tighter mb-2">EPAY 支付方式</div>
                    <p className="text-slate-400 font-bold text-sm">创建您的全球支付账户</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="email"
                        placeholder="邮箱地址"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-slate-900"
                        required
                    />
                    <input
                        type="password"
                        placeholder="设置密码"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-slate-900"
                        required
                    />

                    {/* 验证码 UI */}
                    <div className="flex gap-3">
                        <input 
                            type="text" 
                            placeholder="验证码" 
                            value={captchaInput}
                            onChange={(e) => setCaptchaInput(e.target.value)}
                            className="flex-1 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-slate-900"
                            required
                        />
                        <div 
                            onClick={generateCaptcha}
                            className="w-32 bg-blue-50 rounded-2xl flex items-center justify-center font-black text-blue-600 border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors select-none tracking-[0.2em] text-lg whitespace-nowrap"
                        >
                            {currentCaptcha || '....'}
                        </div>
                    </div>
                    
                    {/* 提示信息 */}
                    {message && (
                        <p className={`text-sm font-bold text-center ${message.includes('失败') || message.includes('错误') ? 'text-red-500' : 'text-green-500'}`}>
                            {message}
                        </p>
                    )}

                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all mt-2 disabled:opacity-50"
                    >
                        {loading ? '正在处理...' : '注 册'}
                    </button>
                </form>

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