import dbConnect from "../../../db/connect";
import Recordsdata from "../../../db/models/recordsdata";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const record = await Recordsdata.findById(id);
    return response.status(200).json(record);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
