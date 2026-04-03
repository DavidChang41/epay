export default function SettingPage() {
  const settings = [
    { title: '语言', desc: '设置语言偏好', action: '中文(简体)' },
    { title: '站内信', desc: '查看系统通知' },
    { title: '修改密码', desc: '点击修改登陆密码' },
    { title: '在线客服', desc: '联系客服 Telegram @supayadmin' },
    { title: '版本号', desc: 'v 1.23.1' },
  ];

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-8 text-slate-800">系统设置</h2>
      
      <div className="space-y-1">
        {settings.map((s) => (
          <div key={s.title} className="flex justify-between items-center p-6 hover:bg-gray-50 rounded-2xl transition cursor-pointer group">
            <div>
              <h3 className="font-bold text-slate-800">{s.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{s.desc}</p>
            </div>
            {s.action ? (
              <span className="bg-gray-100 px-3 py-1 rounded-lg text-xs font-bold text-gray-500">{s.action}</span>
            ) : (
              <span className="text-gray-300 group-hover:translate-x-1 transition-transform">→</span>
            )}
          </div>
        ))}
        
        <div className="pt-8 px-6">
          <button className="text-red-500 font-bold hover:text-red-600">退出系统</button>
        </div>
      </div>
    </div>
  );
}