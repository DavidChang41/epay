import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// 1. 直接用最基础的方式初始化，不依赖任何第三方插件，绝对不会报“导出不存在”
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST() {
  try {
    // 2. 模拟生成一张卡片的数据
    const newCard = {
      // ⚠️ 重要提示：
      // 请去 Supabase 网页后台 -> Table Editor -> profiles 表
      // 复制你自己的 ID (那串长长的 UUID) 替换掉下面的 000...
      user_id: '00000000-0000-0000-0000-000000000000', 
      card_number: `4532 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
      expiry: '12/28',
      cvv: Math.floor(100 + Math.random() * 899).toString(),
      brand: 'VISA'
    };

    // 3. 将卡片数据存入云端数据库
    const { data, error } = await supabase
      .from('cards')
      .insert([newCard])
      .select();

    if (error) {
      console.error('数据库报错:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, card: data[0] });
    
  } catch (err) {
    console.error('服务器内部错误:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}