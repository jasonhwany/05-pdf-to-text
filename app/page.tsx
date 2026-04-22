import PDFToTextClient from "@/components/PDFToTextClient";
import Script from "next/script";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "PDF 텍스트 추출 (PDF to Text)",
  url: "https://pdf.moneystom7.com",
  description: "PDF 파일에서 텍스트를 빠르게 추출하는 무료 도구",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
  inLanguage: ["ko", "en"],
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 font-sans">
      <Script id="json-ld" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PDFToTextClient />

      <section className="max-w-2xl mx-auto mt-16 space-y-10 text-sm text-gray-400 pb-16">
        <div>
          <h2 className="text-white text-base font-semibold mb-3">PDF 텍스트 추출기란?</h2>
          <p>
            PDF 텍스트 추출기(PDF to Text)는 PDF 파일에서 텍스트 내용을 복사·편집 가능한 형태로
            변환하는 무료 온라인 도구입니다. 계약서, 논문, 보고서 등 PDF 문서의 내용을 텍스트로
            추출하여 복사하거나 TXT 파일로 저장할 수 있습니다. 모든 처리는 브라우저에서만 이루어지므로
            민감한 문서도 안전하게 사용할 수 있습니다.
          </p>
        </div>

        <div>
          <h2 className="text-white text-base font-semibold mb-3">주요 특징</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong className="text-gray-300">프라이버시 보호</strong> — 파일이 서버에 업로드되지 않습니다. 브라우저 내 처리.</li>
            <li><strong className="text-gray-300">다중 페이지 지원</strong> — 페이지별로 구분하여 텍스트를 추출합니다.</li>
            <li><strong className="text-gray-300">드래그 앤 드롭</strong> — 파일을 끌어다 놓으면 즉시 처리됩니다.</li>
            <li><strong className="text-gray-300">TXT 저장</strong> — 추출된 텍스트를 TXT 파일로 다운로드할 수 있습니다.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-white text-base font-semibold mb-3">자주 묻는 질문 (FAQ)</h2>
          <dl className="space-y-4">
            <div>
              <dt className="text-gray-300 font-medium">스캔된 PDF(이미지 PDF)도 텍스트 추출이 되나요?</dt>
              <dd className="mt-1">스캔된 이미지 PDF는 텍스트가 이미지로 저장되어 있어 직접 추출이 어렵습니다. 텍스트 레이어가 있는 디지털 PDF 파일에서만 작동합니다.</dd>
            </div>
            <div>
              <dt className="text-gray-300 font-medium">파일 크기 제한이 있나요?</dt>
              <dd className="mt-1">최대 50MB의 PDF 파일을 지원합니다. 그 이상의 파일은 브라우저 메모리 한계로 처리가 어려울 수 있습니다.</dd>
            </div>
            <div>
              <dt className="text-gray-300 font-medium">한국어, 일본어 등 다국어 PDF도 지원하나요?</dt>
              <dd className="mt-1">네. PDF 파일 내에 텍스트 레이어가 있다면 한국어, 영어, 일본어, 중국어 등 대부분의 언어를 추출할 수 있습니다.</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
