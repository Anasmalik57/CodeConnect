import Navbar from "@/components/Navbar";
import "./globals.css";
import FloatingLinearOrb from "@/components/FloatingLinearOrb";
import FooterComponent from "@/components/Footer";

export const metadata = {
  title: "NoDeskDeveloper - Connect, Build, Grow",
  description: "Your ultimate destination for developers and ready-made software solutions. Connect with top talent, explore innovative tools, and elevate your projects with NoDeskDeveloper.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <>
          <Navbar />
          <FloatingLinearOrb />
          {children}
          <FooterComponent />
        </>
      </body>
    </html>
  );
}
