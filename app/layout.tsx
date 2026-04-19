import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"

const BASE_URL = "https://pdf.moneystom7.com"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "PDF 텍스트 추출 — MoneyStom7",
    template: "%s | MoneyStom7",
  },
  description: "PDF 파일에서 텍스트를 빠르게 추출. 무료 온라인 PDF 변환기. Free online PDF to text extractor. Extract text from PDF files instantly in your browser.",
  keywords: ["PDF 텍스트 추출", "PDF to Text", "무료", "온라인", "계산기", "PDF to text", "extract text from PDF", "PDF converter", "free PDF tool"],
  authors: [{ name: "MoneyStom7" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "PDF 텍스트 추출 — MoneyStom7",
    description: "PDF 파일에서 텍스트를 빠르게 추출. 무료 온라인 PDF 변환기.",
    url: BASE_URL,
    siteName: "MoneyStom7",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF 텍스트 추출 — MoneyStom7",
    description: "PDF 파일에서 텍스트를 빠르게 추출. 무료 온라인 PDF 변환기.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8414331859152952"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
