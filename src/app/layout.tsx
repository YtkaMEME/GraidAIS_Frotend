import { Inter } from "next/font/google";
import Script from 'next/script';
import 'bootstrap/dist/css/bootstrap.min.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Audience Rating",
    description: "Сайт для Оценки",
};



export default function RootLayout({ children}) {
  return (
      <html lang="ru">
      <body>
      {children}
      <Script
                crossOrigin="anonymous"
                strategy="afterInteractive"
            />
        </body>

      </html>
  );
}
