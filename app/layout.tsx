
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "DZ Tabib ",
  description:
    "DZ Tabib is your trusted platform to find doctors, psychologists, and healthcare services in Algeria. Your health, our priority.",
  keywords:
    "DZ Tabib, Tabib DZ, doctors Algeria, psychologists Algeria, healthcare Algeria, find doctors, Algeria healthcare platform",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <AuthProvider>
      
      <body>
   
        {children}
      
      </body>
    </AuthProvider>
    </html>
  );
}
