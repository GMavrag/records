import { useSession, signIn, signOut } from "next-auth/react";
export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <h3>
          <img
            src={session.user.image}
            style={{ width: "60px", borderRadius: "50%" }}
          />
          Signed in as {session.user.name}
        </h3>
        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
