
import MainLayout from "@/components/MainLayout";
import "./globals.css";


export const metadata = {
  title: "NafisUI",
  description: "Portfolio website of Nafis Ul Islam",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Pass the children into the MainLayout */}
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}