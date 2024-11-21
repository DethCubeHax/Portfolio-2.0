import MainLayout from "@/components/MainLayout";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

export const metadata = {
  title: "Nafis Ul Islam",
  description: "Portfolio website of Nafis Ul Islam",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body>
        {/* Pass the children into the MainLayout */}
        <MainLayout>{children}</MainLayout>
        <Analytics/>
        <SpeedInsights/>
      </body>
    </html>
  );
}
