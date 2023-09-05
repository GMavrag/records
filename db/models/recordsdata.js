import mongoose from "mongoose";

const { Schema } = mongoose;

const recordsdataSchema = new Schema({
  band_name: { type: String },
  genre: { type: String },
  album_name: { type: String },
  year: { type: Number },
  price: { type: Number },
  photo: { type: String },
  description: { type: String },
});

const Recordsdata =
  mongoose.models.Recordsdata ||
  mongoose.model("Recordsdata", recordsdataSchema);

export default Recordsdata;
