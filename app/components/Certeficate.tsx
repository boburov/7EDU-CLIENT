"use client";

import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface CertificateProps {
  name: string;
  course: string;
}

export default function CertificateGenerator({
  name,
  course,
}: CertificateProps) {
  const certRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    const element = certRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "px", [canvas.width, canvas.height]);
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("certificate.pdf");
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        ref={certRef}
        className="relative w-[1080px] h-[720px] bg-white text-black overflow-hidden sertificat"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute text-center w-full"
          style={{
            top: "180px",
            left: -25,
          }}
        >
          <h2 className="text-[23px] font-semibold">{course}</h2>
        </div>
        <div className="absolute top-[315px] w-full text-center text-5xl">
          <h3 className="text-2xl">{name} kursni muvaffaqiyatli yakunladi</h3>
        </div>
      </div>

      <button
        onClick={downloadPDF}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        PDF yuklab olish
      </button>
    </div>
  );
}
