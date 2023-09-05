import dbConnect from "../../../db/connect";
import Recordsdata from "../../../db/models/recordsdata";
export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const records = await Recordsdata.find();
    console.log(records);
    return response.status(200).json(records);
  }

  if (request.method === "POST") {
    try {
      const { album_name, band_name, genre, year, price, photo, description } =
        request.body;

      const newRecord = new Recordsdata({
        album_name,
        band_name,
        genre,
        year,
        price,
        photo,
        description,
      });

      await newRecord.save();
      return response.status(201).json({ message: "record created" });
    } catch (error) {
      console.error("Error adding record:", error);
      return response
        .status(400)
        .json({ message: "Error adding record", error });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
