import { ToastContainer } from "react-toastify";
import "./globals.css";

export const metadata = {
  title: "SevenEdu Web App",
  description: "Platformaga kirish usulini tanlang. O‘quvchi sifatida kirish · Mehmon sifatida kirish.",
  icons: {
    icon: "./favicon.ico",
  },
  openGraph: {
    title: "SevenEdu Web App",
    description: "Platformaga kirish usulini tanlang. O‘quvchi sifatida kirish · Mehmon sifatida kirish.",
    url: "https://sevenedu.uz",
    siteName: "SevenEdu",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SevenEdu platformasi",
      },
    ],
    locale: "uz_UZ",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ToastContainer position="top-right" />
        {children}</body>
    </html>
  );
}
