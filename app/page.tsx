"use client";
import AdUnit from "@/components/AdUnit"
import { useState, useRef } from "react";

export default function PDFToText() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [pages, setPages] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file || file.type !== "application/pdf") return alert("PDF 파일만 지원됩니다.");
    setFileName(file.name);
    setLoading(true);
    setText("");
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
      const buf = await file.arrayBuffer();
      const doc = await pdfjs.getDocument({ data: buf }).promise;
      setPages(doc.numPages);
      let out = "";
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((it) => ("str" in it ? it.str : "")).join(" ").trim();
        out += `--- ${i}페이지 ---\n${pageText}\n\n`;
      }
      setText(out.trim());
    } catch (e) {
      alert("추출 실패: " + (e instanceof Error ? e.message : String(e)));
    } finally {
      setLoading(false);
    }
  };

  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  const download = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    a.download = fileName.replace(/\.pdf$/i, ".txt");
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 font-sans">
      <div className="max-w-2xl mx-auto pt-10">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">📄</div>
          <h1 className="text-3xl font-bold tracking-tight">PDF 텍스트 추출</h1>
          <p className="text-gray-400 mt-1 text-sm">브라우저에서 안전하게 처리 · 서버 업로드 없음</p>
        </div>

        <div
          className="bg-gray-900 rounded-2xl p-12 text-center border-2 border-dashed border-gray-700 hover:border-emerald-500/60 transition-colors cursor-pointer"
          onClick={() => inputRef.current?.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}>
          <input ref={inputRef} type="file" accept="application/pdf" className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          <div className="text-4xl mb-3">📎</div>
          <p className="text-gray-300 font-medium">PDF 파일을 드래그하거나 클릭해서 선택</p>
          <p className="text-gray-600 text-sm mt-1">최대 50MB · 개인정보 안전 (브라우저 내 처리)</p>
        </div>

        {loading && (
          <div className="mt-5 bg-gray-900 rounded-2xl p-8 text-center">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-gray-400 text-sm">텍스트 추출 중...</p>
          </div>
        )}

        {text && !loading && (
          <div className="mt-5 bg-gray-900 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">{fileName} · {pages}페이지 · {text.length.toLocaleString()}자</span>
              <div className="flex gap-2">
                <button onClick={copy} className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors">
                  {copied ? "✓ 복사됨" : "복사"}
                </button>
                <button onClick={download} className="text-xs bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 rounded-lg transition-colors">
                  TXT 저장
                </button>
              </div>
            </div>
            <textarea readOnly value={text}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-sm font-mono h-96 resize-none focus:outline-none leading-relaxed" />
          </div>
        )}

        <p className="text-center text-xs text-gray-600 mt-10">
          <a href="https://moneystom7.com" className="hover:text-gray-400 transition-colors">← MoneyStom7 홈으로</a>
        </p>
      </div>
    </div>
  );
}
