import Login from "./Login";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <Login />
      <Link href="/">
        <h3>Records store for all</h3>
      </Link>
      <p>Card baskettt</p>
    </>
  );
}
