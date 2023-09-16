export default function BuyButton({ userRecords, userId }) {
  const ids = userRecords.map((record) => record._id);

  async function deleteRecords(ids) {
    console.log("------------------------------");

    await fetch(`/api/records/`, {
      method: "DELETE",
      body: JSON.stringify(ids),
    });

    await fetch("/api/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    console.log("--------------------------2---");
    alert(
      "THANK YOU for supporting RECORDS STORE!! Please check your email to receive your Records!!!!"
    );
    console.log("------------------------3------");
  }

  return <button onClick={() => deleteRecords(ids)}>Buy Records</button>;
}
