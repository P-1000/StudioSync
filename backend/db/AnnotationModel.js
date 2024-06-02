import mongoose from "mongoose";

const annotationSchema = new mongoose.Schema(
  {
    draft_id: {
      type: Number,
      required: true,
    },
    track_id: {
      type: Number,
      required: true,
    },
    time_seconds: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Annotation", annotationSchema);
