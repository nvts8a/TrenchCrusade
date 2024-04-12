import type { Metadata }  from "next";
import { EB_Garamond }    from "next/font/google";
import { UnifrakturCook } from "next/font/google";
import "./globals.css";

const garamond = EB_Garamond({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trench Crusde Supplement",
  description: "A Trench Crusde Warband Builder and Rules searching tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={garamond.className}>{children}</body>
    </html>
  );
}
