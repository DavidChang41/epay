export default function WalletPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 text-slate-800">我的钱包</h2>
      
      {/* 余额卡片 */}
      <div className="bg-[#EBF1FF] p-10 rounded-[32px] text-center border border-blue-100">
        <div className="text-4xl mb-2">👛</div>
        <div className="text-4xl font-black text-slate-800">$ 0.00</div>
        <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest font-bold">USD 钱包余额</p>
        
        <div className="flex justify-center gap-4 mt-8">
          <button className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-100 hover:scale-105 transition">充值</button>
          <button className="bg-orange-400 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-100 hover:scale-105 transition">明细</button>
        </div>
      </div>

      {/* 无数据提示 */}
      <div className="mt-12 flex flex-col items-center justify-center py-20 border-t border-gray-50">
         <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-400 mb-4 text-2xl">i</div>
         <p className="text-gray-400 font-medium">暂无充值订单数据</p>
         <button className="mt-4 text-blue-600 text-sm font-bold">刷新</button>
      </div>
    </div>
  );
}