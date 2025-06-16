"use client";

import { CertificateTemplate } from "@/app/components/Certeficate";
import { PDFDownloadLink } from "@react-pdf/renderer";

export default function CertificatePage() {
  const fullName = "Shukurullo Boburov";
  const courseName = "Frontend Asoslari";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Sertifikatingiz tayyor!</h1>
      <PDFDownloadLink
        document={
          <CertificateTemplate
            fullName="Shukurullo Boburov"
            courseName="Ingliz"
            backgroundImage="/certificate-templazte.jpg"
          />
        }
        fileName="sertifikat.pdf"
      >
        {({ loading }) =>
          loading ? "Yuklanmoqda..." : "📥 Sertifikatni yuklab olish"
        }
      </PDFDownloadLink>
    </div>
  );
}
