import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SessionProvider } from "next-auth/react";

/**
 * Main application
 * Localizationprovider for day.js
 * @param param0
 * @returns
 */

export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Component {...pageProps} />
      </LocalizationProvider>
    </SessionProvider>
  );
}
