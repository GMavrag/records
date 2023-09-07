import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
export default function CardBasket({ data }) {
  const [bagItems, setBagItems] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    async function fetchBagItems() {
      try {
        const response = await fetch(`/api/users?id=${session?.user.id}`);
        const userData = await response.json();
        console.log(userData);
        if (userData.user.bag) {
          setBagItems(userData.user.bag);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchBagItems();
  }, [session?.user.id]);

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
          </li>
        ))}
      </ul>
      <h3>
        Total €:{" "}
        {userRecords.reduce((acc, val) => {
          return acc + val.price;
        }, 0)}
      </h3>
    </>
  );
}
