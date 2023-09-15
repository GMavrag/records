import Login from "./Login";
import Link from "next/link";
export default function Header() {
  return (
    <header>
      <div className="left-header">
        <Link href="/">
          <h1>Records store for all</h1>
        </Link>
      </div>
      <div className="right-header">
        <Login />
        <Link href="/add-record">
          <button className="add-record-button">Add a Record</button>
        </Link>
        <Link href="/records-basket">
          <h4>Shopping Bag</h4>
        </Link>
      </div>
    </header>
  );
}
