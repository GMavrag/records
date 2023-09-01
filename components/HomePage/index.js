import Image from "next/image";

export default function HomePage({ data }) {
  console.log(data);
  return (
    <ul className="album-list">
      {data.map((record) => (
        <li key={record.id} className="album-card">
          <div className="album-cover">
            <a href={`/records/${record._id}`}>
              <Image
                src={record.photo}
                alt="Album Cover"
                width={150}
                height={150}
              />
              <div className="band-name-overlay">{record.band_name}</div>
            </a>
          </div>
          <div className="album-details">
            <a href={`/records/${record.id}`} className="details-link">
              DETAILS
            </a>
            <p className="genre">GENRE: {record.genre}</p>
            <p className="album-name">ALBUM: {record.album_name}</p>
            <p className="year">YEAR: {record.year}</p>
            <p className="price">Price: {record.price}€</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
