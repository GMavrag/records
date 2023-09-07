import User from "@/db/models/User";

import dbConnect from "@/db/connect";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const id = req.query.id;
    const user = await User.findById(id);
    res.json({ user });
  }
}
