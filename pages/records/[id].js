import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/record-details.module.css";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
export default function RecordDetails() {
  const router = useRouter();
  const { id } = router.query;

  /* const record = recordsData.find((rec) => rec.id === id); */
  const { isLoading, data: record } = useSWR(`/api/records/${id}`, fetcher);

  if (isLoading) {
    return <p>Loading...</p>;
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
        <button className={styles.addToBagButton}>
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
