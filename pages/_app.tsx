import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '../style.css'; // Assuming you have a global stylesheet, adjust if necessary

// This is the main App component.
// It's used to initialize pages.
// Wrapping with SessionProvider here makes session data available globally.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
