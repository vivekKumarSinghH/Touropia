import mongoose from "mongoose";

const tourSchema = mongoose.Schema({
  title: String,
  description: String,
  name: String,
  creator: String,
  tags: [String],
  imageFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  }
},{
  versionKey:false
});

const TourModal = mongoose.model("Tour", tourSchema);

export default TourModal;
