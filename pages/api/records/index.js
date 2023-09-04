// pages/api/records/index.js
import dbConnect from "../../../db/connect";
import Recordsdata from "../../../db/models/recordsdata";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const records = await Recordsdata.find();
    return response.status(200).json(records);
  } else if (request.method === "POST") {
    const recordData = JSON.parse(request.body);

    try {
      const record = new Recordsdata(recordData);
      await record.save();

      return response
        .status(201)
        .json({ message: "Record added successfully" });
    } catch (error) {
      return response.status(400).json({ message: "Error adding record" });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
