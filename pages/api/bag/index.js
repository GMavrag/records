import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "@/db/connect";
import User from "@/db/models/User";
export default async function handler(req, res) {
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);
  if (req.method === "POST") {
    try {
      const { id } = req.body;
      await User.updateOne(
        { _id: session.user.id },
        { $addToSet: { bag: id } }
      );
      return res.status(200).json({ message: "Added to bag" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  }
  if (req.method === "PATCH") {
    try {
      const { id } = req.body;
      await User.updateOne({ _id: session.user.id }, { $pull: { bag: id } });

      return res.status(200).json({ message: "Ok " });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  }
}
