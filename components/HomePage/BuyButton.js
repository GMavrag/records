export default function BuyButton({ userRecords, userId }) {
  const ids = userRecords.map((record) => record._id);

  async function deleteRecords(ids) {
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
    console.log("BUTTON");
    location.reload();
  }

  return <button onClick={() => deleteRecords(ids)}>Buy Records</button>;
}
