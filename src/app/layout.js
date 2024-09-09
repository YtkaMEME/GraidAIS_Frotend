import { Inter } from "next/font/google";
import "../styles/globals.css";
import Script from 'next/script';
import 'bootstrap/dist/css/bootstrap.min.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Улучшенная АИС",
    description: "Сайт для Оценки",
};



export default function RootLayout({ children}) {
  return (
      <html lang="ru">
        <body>
            {children}
            <Script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
                crossOrigin="anonymous"
                strategy="afterInteractive" // Загрузка скрипта после рендеринга страницы
            />
        </body>

      </html>
  );
}
