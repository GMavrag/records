import dbConnect from "../../../db/connect";
import Recordsdata from "../../../db/models/recordsdata";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const records = await Recordsdata.find();
    return response.status(200).json(records);
  }

  const { Types } = require("mongoose");

  if (request.method === "DELETE") {
    let ids = request.body;

    if (!Array.isArray(ids)) {
      try {
        ids = JSON.parse(ids);
      } catch (error) {
        console.error("Error parsing request.body:", error);
        return response.status(400).json({ error: "Invalid request body" });
      }
    }

    ids = ids.map((id) => new Types.ObjectId(id));

    const toDelete = await Recordsdata.deleteMany({ _id: { $in: ids } });
    response.status(200).json(toDelete);
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
