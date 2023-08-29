import Image from "next/image";

export default function HomePage({ data }) {
  console.log(data);
  return (
    <ul>
      {data.map((record, index) => (
        <li key={index}>
          <Image
            Record
            src={record.photo}
            alt="album-photo"
            width={150}
            height={150}
          />
          <p>BAND: {record.band_name}</p>
          <p>GERNE:{record.genre}</p>
          <p>ALBUM:{record.album_name}</p>
          <p>YEAR:{record.year}</p>
          <p>Price:{record.price}€</p>
        </li>
      ))}
    </ul>
  );
}
