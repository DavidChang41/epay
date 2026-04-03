'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  // 监听滚动，改变导航栏透明度
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-700">
      
      {/* 1. 动态导航栏 */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm h-16' : 'bg-transparent h-24'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="text-3xl font-black text-blue-600 italic tracking-tighter cursor-pointer">EPAY</div>
            <div className="hidden lg:flex items-center gap-8 text-[15px] font-bold text-slate-500">
              <Link href="#features" className="hover:text-blue-600 transition-colors">产品功能</Link>
              <Link href="#solutions" className="hover:text-blue-600 transition-colors">解决方案</Link>
              <Link href="#safety" className="hover:text-blue-600 transition-colors">安全保障</Link>
              <Link href="#pricing" className="hover:text-blue-600 transition-colors">资费标准</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-[15px] font-bold text-slate-600 px-4 py-2 hover:text-blue-600">登录</Link>
            <Link href="/register" className="bg-blue-600 text-white px-8 py-3 rounded-full text-[15px] font-black shadow-xl shadow-blue-100 hover:bg-blue-700 hover:-translate-y-0.5 transition-all">
              立即开通
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section - 视觉核心 */}
      <section className="relative pt-32 lg:pt-48 pb-20 overflow-hidden">
        {/* 背景装饰元素 */}
        <div className="absolute top-0 right-0 -z-10 w-[50%] h-[800px] bg-gradient-to-b from-blue-50/50 to-transparent rounded-bl-[200px]" />
        <div className="absolute top-40 left-10 -z-10 w-72 h-72 bg-blue-400 opacity-5 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-blue-600/5 border border-blue-600/10 rounded-full text-blue-600">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="text-xs font-black uppercase tracking-widest">Next Generation Payment</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[1.05] tracking-tight">
              赋能全球<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">数字消费</span>
            </h1>
            
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg">
              EPAY 提供专业级虚拟信用卡解决方案。支持广告投放、海外订阅及跨境采购，尊享秒级开卡与极致费率。
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link href="/register" className="px-12 py-6 bg-slate-900 text-white rounded-[24px] font-black text-lg shadow-2xl hover:bg-blue-600 hover:-translate-y-1 transition-all text-center">
                立即开卡
              </Link>
              <div className="flex items-center gap-4 px-2">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-slate-200 border-4 border-white shadow-sm overflow-hidden flex items-center justify-center font-bold text-[10px] text-slate-400">USER</div>
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-black text-slate-800 tracking-tight">12.5k+ 活跃用户</p>
                  <p className="text-slate-400 font-medium italic">信任并选择 EPAY</p>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：精细化卡片动效 */}
          <div className="relative perspective-1000 group">
            <div className="relative z-10 aspect-[1.58/1] w-full bg-gradient-to-br from-slate-800 to-slate-950 rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] p-12 text-white flex flex-col justify-between transform rotate-[-6deg] group-hover:rotate-0 transition-all duration-1000 ease-out border border-white/10">
              <div className="flex justify-between items-start">
                <div className="text-3xl font-black italic">EPAY</div>
                <div className="w-16 h-12 bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-xl opacity-80" />
              </div>
              <div className="space-y-6">
                <div className="text-3xl font-mono tracking-[0.3em] font-medium text-slate-200">**** **** **** 9918</div>
                <div className="flex gap-12">
                  <div>
                    <p className="text-[10px] uppercase opacity-40 font-bold mb-1">Card Holder</p>
                    <p className="text-sm font-bold tracking-widest uppercase">EPAY PREMIUM USER</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase opacity-40 font-bold mb-1">Expires</p>
                    <p className="text-sm font-bold">12/28</p>
                  </div>
                </div>
              </div>
            </div>
            {/* 第二张卡片叠加 */}
            <div className="absolute top-10 -right-4 -z-10 aspect-[1.58/1] w-full bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[40px] shadow-2xl p-12 transform rotate-[6deg] group-hover:rotate-[12deg] transition-all duration-1000 border border-white/20 opacity-90" />
          </div>
        </div>
      </section>

      {/* 3. 合作伙伴流转 - 增加页面长度与真实感 */}
      <section className="py-20 border-y border-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-black text-slate-300 uppercase tracking-[0.3em] mb-12">Supported Platforms</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all">
             <div className="text-2xl font-black italic">OpenAI</div>
             <div className="text-2xl font-black italic">Facebook</div>
             <div className="text-2xl font-black italic">Google Ads</div>
             <div className="text-2xl font-black italic">Amazon</div>
             <div className="text-2xl font-black italic">Netflix</div>
             <div className="text-2xl font-black italic">Midjourney</div>
          </div>
        </div>
      </section>

      {/* 4. 详细特性区 */}
      <section id="features" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="grid grid-cols-2 gap-6">
               {[
                 { t: '50+ 场景', d: '深度适配主流应用', i: '🎯' },
                 { t: '极速充值', d: '多种支付方式即时到账', i: '💸' },
                 { t: '费用透明', d: '无隐形收费与维护费', i: '💎' },
                 { t: '批量管理', d: '专为工作室与投放设计', i: '📊' }
               ].map((item, i) => (
                 <div key={i} className={`p-8 rounded-[32px] bg-white border border-slate-100 hover:shadow-xl transition-all ${i % 2 !== 0 ? 'mt-8' : ''}`}>
                   <div className="text-3xl mb-4">{item.i}</div>
                   <h4 className="font-black text-slate-800 mb-2">{item.t}</h4>
                   <p className="text-sm text-slate-400 font-medium leading-relaxed">{item.d}</p>
                 </div>
               ))}
            </div>
            <div className="space-y-8">
              <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">不仅是卡，<br />更是您的全球支付助手</h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                EPAY 的每一项功能都旨在解决跨境消费中的痛点。从 Open AI 订阅到 Facebook 广告开票，我们为您抹平支付鸿沟。
              </p>
              <ul className="space-y-4">
                {['实时汇率结算，拒绝套利', '一键生成账单报表', '全天候技术支持团队'].map((t, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 底部 CTA 区域 */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto bg-blue-600 rounded-[60px] p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="relative z-10 space-y-10">
            <h2 className="text-5xl md:text-6xl font-black tracking-tight">准备好开启<br />您的全球支付之旅了吗？</h2>
            <p className="text-blue-100 text-xl font-medium max-w-2xl mx-auto opacity-80">
              加入 10,000+ 企业与个人用户的选择，体验前所未有的开卡速度。
            </p>
            <div className="flex justify-center pt-4">
              <Link href="/register" className="px-16 py-6 bg-white text-blue-600 rounded-full font-black text-xl shadow-2xl hover:scale-105 transition-transform">
                免费创建账号
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
            <div className="text-3xl font-black text-blue-600 italic">EPAY</div>
            <p className="text-slate-400 font-medium max-w-xs">领先的跨境虚拟卡支付解决方案提供商，致力于让全球支付变得简单透明。</p>
          </div>
          <div className="space-y-4 text-sm">
            <h5 className="font-black text-slate-800 uppercase tracking-widest">产品</h5>
            <div className="flex flex-col gap-3 text-slate-400 font-bold">
              <Link href="#">虚拟卡方案</Link>
              <Link href="#">企业支付</Link>
              <Link href="#">开发者 API</Link>
            </div>
          </div>
          <div className="space-y-4 text-sm">
            <h5 className="font-black text-slate-800 uppercase tracking-widest">支持</h5>
            <div className="flex flex-col gap-3 text-slate-400 font-bold">
              <Link href="#">帮助中心</Link>
              <Link href="#">常见问题</Link>
              <Link href="#">联系我们</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}