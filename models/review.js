import mongoose from "mongoose";

const Schema = mongoose.Schema

const reviewSchema = new mongoose.Schema ({
  breweryName: String,
  rating: Number, 
  comment: String,
  breweryId: String,
  userName: String,
  user: {type: Schema.Types.ObjectId, ref: "Profile"},
  brewery:{type: Schema.Types.ObjectId, ref: "Brewery"},
}, {
  timestamps: true
})

const Review = mongoose.model('Review', reviewSchema)

export {
  Review
}