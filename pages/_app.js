import "@/styles/globals.css";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const { data } = useSWR("/records.json", fetcher);
  if (!data) return;
  console.log(data);

  return <Component {...pageProps} data={data} />;
}
