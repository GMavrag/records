import mongoose from "mongoose";

const { Schema } = mongoose;

const recordsdataSchema = new Schema({
  id: { type: String, required: true },
  band_name: { type: String, required: true },
  genre: { type: String, required: true },
  album_name: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  photo: { type: String, required: true },
  description: { type: String, required: true },
});

const Recordsdata =
  mongoose.models.Recordsdata ||
  mongoose.model("Recordsdata", recordsdataSchema);

export default Recordsdata;
