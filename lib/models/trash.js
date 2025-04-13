import mongoose, { Schema } from "mongoose";

const trashSchema = new Schema({
  trash: {
    type: String,
    required: true,
    enum: ["recyclable", "compost", "landfill"],
  },
});

const Trash = mongoose.models.Trash || mongoose.model("Trash", trashSchema);
export default Trash;
