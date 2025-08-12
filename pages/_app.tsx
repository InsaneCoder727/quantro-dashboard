import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        errorRetryCount: 3,
        errorRetryInterval: 5000,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}
