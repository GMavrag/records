import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/record-details.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
export default function RecordDetails() {
  const [bagItems, setBagItems] = useState([]);
  function handleBag(id) {
    if (bagItems) {
      setBagItems((prev) => [...prev, id]);
    } else {
      setBagItems(id);
    }
    console.log(bagItems);
  }

  const router = useRouter();
  const { id } = router.query;

  /* const record = recordsData.find((rec) => rec.id === id); */

  const { isLoading, data: record } = useSWR(`/api/records/${id}`, fetcher);
  const { data: session } = useSession();

  if (isLoading) {
    return <p>Loading...</p>;
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
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Sign in to add to cart");
    }
  }

  return (
    <div className={styles.albumDetailsContainer}>
      <h1>{record.album_name}</h1>
      <div className={styles.albumCoverContainer}>
        <Image
          src={record.photo}
          alt="Album Cover"
          width={200}
          height={200}
          className={styles.albumDetailsPhoto}
        />
      </div>
      <div className={styles.albumDescriptionBox}>
        <h2 className={styles.descriptionHeader}>Description</h2>
        <p className={styles.descriptionText}>{record.description}</p>
        <button className={styles.addToBagButton} onClick={updateBag}>
          Add to My Shopping Bag
        </button>
      </div>
      <p>Band: {record.band_name}</p>
      <p>Genre: {record.genre}</p>
      <p>Year: {record.year}</p>
      <p>Price: {record.price}€</p>
      <Link href="/" className="home-button">
        Home
      </Link>
    </div>
  );
}
