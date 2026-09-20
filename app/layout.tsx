import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "inventor-web | 창고 재고 위치 조사",
  description: "samuelsmalls 창고/매장 재고 위치 조사 MVP",
};

const navItems = [
  { href: "/", label: "대시보드" },
  { href: "/spaces", label: "공간" },
  { href: "/inventory", label: "재고" },
  { href: "/inventory/unconfirmed", label: "미확인" },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <header className="site-header">
          <Link className="brand" href="/">
            inventor-web
            <span>창고 재고 위치 조사</span>
          </Link>
          <nav>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
