import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

import RecordForm from "../components/RecordForm";

export default function AddRecord() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        <h1>Add New Record</h1>
        <RecordForm />
        <Link href="/">Home</Link>
      </div>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
