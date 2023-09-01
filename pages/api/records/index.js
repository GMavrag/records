import dbConnect from "../../../db/connect";
import Recordsdata from "../../../db/models/recordsdata";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const records = await Recordsdata.find();
    return response.status(200).json(records);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
