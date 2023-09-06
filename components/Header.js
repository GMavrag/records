// components/Header.js

import Login from "./Login";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="left-header">
        <Link href="/">
          <h3>Records store for all</h3>
        </Link>
      </div>
      <div className="right-header">
        <Login />
        <Link href="/add-record">
          <button className="add-record-button">Add a Record</button>
        </Link>
        <p>Card baskettt</p>
      </div>
    </header>
  );
}
