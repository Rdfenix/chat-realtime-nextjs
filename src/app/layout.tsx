import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../app/styles/index.scss";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Provide from "./shared/layout/Provide";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lets Talk",
  description: "A chat to make new friends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <Provide>{children}</Provide>
      </body>
    </html>
  );
}
