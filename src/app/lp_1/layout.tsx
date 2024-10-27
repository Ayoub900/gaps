import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";

const inter = Noto_Kufi_Arabic({ subsets: ["arabic"] });

export const metadata: Metadata = {
    title: "ASBA",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
