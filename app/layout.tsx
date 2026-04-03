import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EPAY - 全球虚拟信用卡管理平台",
  description: "专业、安全、高效的虚拟卡分发系统",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className="antialiased">
        {/* 这里不要放 Sidebar，由具体页面的 Layout 决定是否显示 */}
        {children}
      </body>
    </html>
  );
}