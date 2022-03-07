import mongoose from "mongoose";

const Schema = mongoose.Schema

const reviewSchema = new mongoose.Schema ({
  rating: Number, 
  user: {type: Schema.Types.ObjectId, ref: "Profile"},
  comment: String,
  brewery:{type: Schema.Types.ObjectId, ref: "Brewery"},
}, {
  timestamps: true
})

const Review = mongoose.model('Review', reviewSchema)

export {
  Review
}