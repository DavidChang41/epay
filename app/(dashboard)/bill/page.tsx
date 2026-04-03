export default function BillPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 text-slate-800">账单记录</h2>
      
      {/* 筛选栏 */}
      <div className="flex gap-4 mb-8">
         <select className="bg-gray-50 border-none rounded-xl px-4 py-2 text-sm text-gray-600 outline-none">
            <option>全部类型</option>
            <option>开卡支出</option>
            <option>充值记录</option>
         </select>
         <div className="bg-gray-50 rounded-xl px-4 py-2 text-sm text-gray-500 cursor-pointer hover:bg-gray-100">
            2026-04 → 2026-04 📅
         </div>
      </div>

      {/* 空状态 */}
      <div className="text-center py-32 border-t border-gray-50 flex flex-col items-center">
         <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-400 mb-6 text-3xl">i</div>
         <p className="text-gray-400 mb-6">暂无交易数据，可改变筛选条件后刷新重试</p>
         <button className="border border-gray-200 px-8 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition">刷新数据</button>
      </div>
    </div>
  );
}