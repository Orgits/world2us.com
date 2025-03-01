import type { Metadata } from "next";
import "@/styles/styles.scss";
import GlobalProvider from "./GlobalProvider";
import ModalCart from "../components/Modal/ModalCart";
import ModalWishlist from "../components/Modal/ModalWishlist";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalQuickview from "../components/Modal/ModalQuickview";
import ModalCompare from "../components/Modal/ModalCompare";
import CountdownProvider from "./CountdownProvider/CountdownProvider"; // Fixes countdownTime SSR issue

export const metadata: Metadata = {
  title: "World2us",
  description: "Multipurpose eCommerce Template",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Correct Google Font Import */}
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <GlobalProvider>
          <CountdownProvider>
            {children}
            <ModalWishlist />
            <ModalSearch />
            <ModalQuickview />
            <ModalCompare />
          </CountdownProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}