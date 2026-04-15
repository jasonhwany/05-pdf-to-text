import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "PDF 텍스트 추출 — MoneyStom7",
  description: "PDF 파일에서 텍스트를 즉시 추출. 서버 없이 브라우저에서 안전하게 처리.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ko"><body>{children}</body></html>;
}
