'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'

// 1. 核心语言字典 - 确保所有文本都在这里定义
const DICT = {
  zh: {
    nav: ['产品', '方案', '安全', '资费'],
    login: '登录',
    register: '立即开通',
    heroTitle: '赋能全球',
    heroSubTitle: '数字消费',
    cardType: '场景分类',
    cta: '立即开卡',
    sceneTitle: '无地域限制 虚拟信用卡',
    sceneSub: '让消费自由随行',
    footerTitle: '支付本该更简单',
    footerBtn: '立即免费注册',
    exp: '有效期',
    langLabel: 'English',
    heroDesc: '立即开启账户，体验全球便捷跨境支付方案。'
  },
  en: {
    nav: ['Product', 'Solution', 'Security', 'Price'],
    login: 'Login',
    register: 'Get Started',
    heroTitle: 'Empowering',
    heroSubTitle: 'Global Spend',
    cardType: 'Category',
    cta: 'Get Your Card',
    sceneTitle: 'Limitless Virtual Cards',
    sceneSub: 'Spend Freedom Anywhere',
    footerTitle: 'Payment Made Simple',
    footerBtn: 'Register Free Now',
    exp: 'EXP',
    langLabel: '中文',
    heroDesc: 'Start your account now for seamless global payments.'
  }
}

// 2. 幻灯片数据配置
const SLIDES = [
  { 
    id: 'amazon', label: { zh: '海淘无忧', en: 'Global Shopping' }, title: 'Amazon', color: 'bg-[#FFDE6B]', 
    text: { zh: '亚马逊支付隔离真实卡号。', en: 'Pay on Amazon with isolated card numbers.' },
    logo: <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-5 w-auto" />
  },
  { 
    id: 'chatgpt', label: { zh: 'AI高效', en: 'AI Productivity' }, title: 'OpenAI', color: 'bg-[#C5D9A5]', 
    text: { zh: 'ChatGPT Plus稳定续费。', en: 'Stable ChatGPT Plus billing.' },
    logo: <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" alt="ChatGPT" className="h-8 w-auto opacity-90" />
  },
  { 
    id: 'steam', label: { zh: '游戏自由', en: 'Gaming' }, title: 'Steam', color: 'bg-[#B2C6D1]', 
    text: { zh: 'Steam跨区购省50%。', en: 'Save 50% on Steam regions.' },
    logo: <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg" alt="Steam" className="h-10 w-auto" />
  }
]

// 3. 场景网格数据
const SCENES = [
  { title: "Adobe CC", color: "bg-[#B492F9]", size: "md:row-span-2", desc: { zh: "管理多账号支出。", en: "Manage multiple accounts." }, img: "🎨" },
  { title: "Peloton", color: "bg-[#FF7898]", size: "md:col-span-1", desc: { zh: "随时取消订阅。", en: "Cancel anytime." }, img: "🚴" },
  { title: "Spotify", color: "bg-[#C4E69D]", size: "md:col-span-1", desc: { zh: "避免地区限制。", en: "No geo-restrictions." }, img: "🎧" },
  { title: "GitHub", color: "bg-[#FFDE6B]", size: "md:col-span-1", desc: { zh: "工具一键采购。", en: "Procure tools easily." }, img: "💻" },
  { title: "Nintendo", color: "bg-[#FF9B67]", size: "md:col-span-2", desc: { zh: "跨区低价购游戏。", en: "Regional game discounts." }, img: "🎮" },
  { title: "Booking", color: "bg-[#C4D7E6]", size: "md:col-span-1", desc: { zh: "锁定汇率风险。", en: "Lock hotel rates." }, img: "🏨" }
]

export default function LandingPage() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh')
  const [current, setCurrent] = useState(0)
  const t = DICT[lang]

  // 3D 卡片动力学逻辑
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(useSpring(y, { stiffness: 150, damping: 20 }), [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(useSpring(x, { stiffness: 150, damping: 20 }), [-0.5, 0.5], ["-10deg", "10deg"])

  const toggleLang = () => setLang(lang === 'zh' ? 'en' : 'zh')

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden text-[#1D1D1F]">
      
      {/* --- 极简导航栏 --- */}
      <nav className="fixed top-0 w-full h-16 z-50 bg-white/70 backdrop-blur-xl px-8 flex items-center justify-between border-b border-black/[0.03]">
        <div className="flex items-center gap-10">
          <div className="text-xl font-black italic text-blue-600 tracking-tighter uppercase">EPAY</div>
          <div className="hidden lg:flex gap-6 text-[11px] font-bold text-black/30 uppercase italic">
            {t.nav.map(i => <Link key={i} href="#" className="hover:text-black transition-colors">{i}</Link>)}
          </div>
        </div>
        
        <div className="flex items-center gap-5">
          <button onClick={toggleLang} className="text-[10px] font-black uppercase tracking-widest px-2 py-1 border border-black/10 rounded hover:bg-black hover:text-white transition-all">
            {t.langLabel}
          </button>
          <Link href="/login" className="text-xs font-bold text-black/50 italic uppercase">{t.login}</Link>
          <Link href="/register" className="bg-blue-600 text-white px-5 py-2 rounded-full text-[10px] font-black shadow-lg hover:scale-105 transition-all uppercase tracking-widest">
            {t.register}
          </Link>
        </div>
      </nav>

      {/* --- Hero Section (解决了文字遮挡与中文残留) --- */}
      <AnimatePresence mode="wait">
        <motion.section 
          key={`${lang}-${current}`}
          className={`relative h-[90vh] flex flex-col items-center justify-center transition-colors duration-700 overflow-hidden ${SLIDES[current].color}`}
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.1] pointer-events-none mix-blend-overlay" />

          <div className="max-w-[1200px] w-full px-8 grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 gap-8">
            {/* 左侧文字区：使用字典变量 */}
            <div className="lg:col-span-5">
              <motion.h1 initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-[60px] lg:text-[84px] font-black leading-[0.85] tracking-tighter italic uppercase">
                {t.heroTitle}<br /><span className="text-white">{t.heroSubTitle}</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-bold text-black/30 max-w-[320px] leading-tight italic mt-6">
                {SLIDES[current].text[lang]} {t.heroDesc}
              </motion.p>
              <div className="mt-8">
                <Link href="/register" className="bg-blue-600 text-white px-10 py-4 rounded-2xl text-lg font-black shadow-xl hover:bg-blue-700 transition-all inline-block uppercase italic">
                  {t.cta}
                </Link>
              </div>
            </div>

            {/* 中间手机样机：极细边框 */}
            <div className="lg:col-span-4 flex justify-center perspective-1000">
              <motion.div 
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  x.set((e.clientX - rect.left) / rect.width - 0.5)
                  y.set((e.clientY - rect.top) / rect.height - 0.5)
                }}
                onMouseLeave={() => { x.set(0); y.set(0) }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative w-full max-w-[300px]"
              >
                <div className="aspect-[1/2] w-full bg-[#0D0D0D] rounded-[42px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] border-[2px] border-[#222] p-2 relative overflow-hidden">
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#222] rounded-b-xl z-20" />

                   <div className="flex flex-col h-full bg-white rounded-[34px] p-5 pt-10 items-center">
                      <div className="mb-6">{SLIDES[current].logo}</div>
                      <h3 className="text-lg font-black italic tracking-tighter uppercase">{SLIDES[current].title}</h3>
                      <p className="text-[8px] font-bold text-gray-300 tracking-widest uppercase mb-8">Authorized</p>
                      
                      <motion.div whileHover={{ scale: 1.05 }} className="w-full aspect-[1.58/1] bg-[#0A0A0A] rounded-xl p-4 flex flex-col justify-between border border-white/5 shadow-2xl relative overflow-hidden">
                         <div className="flex justify-between items-start">
                            <span className="text-[10px] font-black text-white italic">EPAY</span>
                            <div className="w-7 h-5 bg-gradient-to-br from-yellow-500 to-yellow-200 rounded-sm" />
                         </div>
                         <div className="text-white text-[12px] font-mono italic">**** **** **** 8888</div>
                         <span className="text-[7px] text-white/40 font-bold uppercase tracking-widest">{t.exp}: 12/28</span>
                         <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 3, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
                      </motion.div>
                      <div className="mt-auto mb-4 w-full h-10 bg-gray-50 rounded-xl flex items-center justify-center animate-pulse">
                         <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Double Click to Pay</span>
                      </div>
                   </div>
                </div>
              </motion.div>
            </div>

            {/* 右侧控制区 */}
            <div className="lg:col-span-3 flex flex-col lg:items-end gap-6 text-right">
               <div>
                  <span className="text-[9px] font-black text-black/15 tracking-[0.3em] uppercase block mb-1">{t.cardType}</span>
                  <div className="text-xl font-black italic uppercase tracking-tighter">{SLIDES[current].label[lang]}</div>
               </div>
               <button onClick={() => setCurrent((p) => (p + 1) % SLIDES.length)} className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all text-xl">
                 →
               </button>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* --- Bento Grid 场景区 --- */}
      <section className="py-20 px-8 max-w-[1200px] mx-auto bg-white">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <h2 className="text-[48px] lg:text-[64px] font-black tracking-tighter leading-none italic uppercase">
            {t.sceneTitle.split(' ')[0]}<br /><span className="text-blue-600">{t.sceneTitle.split(' ')[1]}</span>
          </h2>
          <p className="text-gray-400 text-xs font-bold italic max-w-[150px] text-right uppercase leading-tight">{t.sceneSub}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[260px]">
          {SCENES.map((scene, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className={`${scene.color} ${scene.size} rounded-[32px] p-8 relative overflow-hidden group shadow-sm flex flex-col justify-between`}>
              <div className="relative z-10">
                <h3 className="text-2xl font-black tracking-tighter italic uppercase text-gray-900 mb-1">{scene.title}</h3>
                <p className="text-[10px] font-bold text-black/20 leading-tight max-w-[130px] italic">{scene.desc[lang]}</p>
              </div>
              <div className="relative z-10 w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:bg-black group-hover:text-white transition-all text-base">↗</div>
              <div className="absolute -right-4 -bottom-4 text-[120px] opacity-[0.05] rotate-12 transition-transform group-hover:rotate-0 pointer-events-none">{scene.img}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-black py-20 rounded-t-[50px] text-center">
         <h2 className="text-white text-[40px] lg:text-[56px] font-black italic tracking-tighter mb-8 uppercase leading-none">{t.footerTitle}</h2>
         <Link href="/register" className="inline-block bg-blue-600 text-white px-10 py-4 rounded-full text-base font-black shadow-xl hover:bg-blue-500 uppercase italic tracking-widest transition-all">
           {t.footerBtn}
         </Link>
      </footer>
    </div>
  )
}