import User from "@/db/models/User";
import dbConnect from "@/db/connect";
export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    const id = req.query.id;
    const user = await User.findById(id);
    res.json({ user });
  } else if (req.method === "DELETE") {
    const { userId } = req.body;

    try {
      await User.findByIdAndUpdate(userId, { $unset: { bag: 1 } });

      res.status(200).json({ message: "Bag array deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting bag array" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
