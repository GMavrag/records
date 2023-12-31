import Login from "@/components/Login";
import "@/styles/globals.css";
import useSWR from "swr";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const { isLoading, data } = useSWR("/api/records", fetcher);
  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Header />
        <div className="wraper">
          <Component {...pageProps} data={data} />
        </div>
      </SessionProvider>
    </>
  );
}
