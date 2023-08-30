import { useRouter } from "next/router";
import recordsData from "../../public/records.json";
import Image from "next/image";
import Link from "next/link";

export default function RecordDetails() {
  const router = useRouter();
  const { id } = router.query;
  const record = recordsData.find((rec) => rec.id === id);

  if (!record) {
    return <p>Loading...</p>;
  }

  return (
    <div className="record-details-container">
      <Link href="/" className="home-button">
        Home
      </Link>
      <h1>{record.album_name}</h1>
      <Image src={record.photo} alt="Album Cover" width={300} height={300} />
      <p>Band: {record.band_name}</p>
      <p>Genre: {record.genre}</p>
      <p>Year: {record.year}</p>
      <p>Price: {record.price}€</p>
    </div>
  );
}
