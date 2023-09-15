import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function AddToBag() {
  const [bagItems, setBagItems] = useState([]);
  const [isInBag, setIsInBag] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchBagItems() {
      if (!session) {
        return;
      }
      try {
        const response = await fetch(`/api/users?id=${session.user.id}`);
        const userData = await response.json();
        if (userData.user.bag.includes(id)) {
          setIsInBag(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchBagItems();
  }, [session, isInBag, id]);

  function handleBag(id) {
    if (bagItems) {
      setBagItems((prev) => [...prev, id]);
    } else {
      setBagItems(id);
    }
  }

  async function updateBag() {
    if (session) {
      try {
        const method = "POST";

        const response = await fetch("/api/bag", {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        if (response.ok) {
          handleBag(id);
          setIsInBag(true);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Sign in to add to Shopping Bag!");
    }
  }

  return (
    <>
      {isInBag ? (
        <h5>This record is in your bag</h5>
      ) : (
        <button onClick={updateBag}>Add to My Shopping Bag</button>
      )}
    </>
  );
}
