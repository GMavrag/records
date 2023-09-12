import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
export default function CardBasket({ data }) {
  const [bagItems, setBagItems] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    async function fetchBagItems() {
      if (!session) {
        return;
      }
      try {
        const response = await fetch(`/api/users?id=${session.user.id}`);
        const userData = await response.json();
        if (userData.user.bag) {
          setBagItems(userData.user.bag);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchBagItems();
  }, [session, bagItems]);

  async function deleteRecord(id) {
    try {
      const method = "PATCH";
      const response = await fetch("/api/bag", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        await response.json();
        setBagItems(userData.user.bag);
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }
  if (!session) {
    return <h4>Please Sign In</h4>;
  }
  const userRecords = data.filter((record) => bagItems.includes(record._id));
  return (
    <>
      <ul>
        {userRecords.map((record) => (
          <li key={record._id}>
            <h4>{record.album_name}</h4>
            <h5>{record.band_name}</h5>
            <h6>{record.price} €</h6>
            <button onClick={() => deleteRecord(record._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>
        Total €:{" "}
        {userRecords
          .reduce((acc, val) => {
            return acc + val.price;
          }, 0)
          .toFixed(2)}
      </h3>
    </>
  );
}
