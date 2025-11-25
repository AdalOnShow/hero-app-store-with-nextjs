import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/providers/AuthProvider";

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: "400",
});

export const metadata = {
    title: "Hero App Store",
    description: "A app store like google play store",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${poppins.className} antialiased`}>
                <AuthProvider> 
                    <Navbar />
                    {children}
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
