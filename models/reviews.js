import mongoose from "mongoose";

const Schema = mongoose.Schema

const reviewsSchema = new mongoose.Schema ({
  rating: Number, 
  user: {type: Schema.Types.ObjectId, ref: "Profile"},
  comment: String,
}, {
  timestamps: true
})

