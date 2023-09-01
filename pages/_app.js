import "@/styles/globals.css";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const { isLoading, data } = useSWR("/api/records", fetcher);
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  console.log(data);

  return <Component {...pageProps} data={data} />;
}
