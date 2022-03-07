import mongoose from "mongoose";

const Schema = mongoose.Schema

const brewerySchema = new Schema({
  id: String,
  profileId: String,
  reviews: [],
  rating: Number,
})

const Brewery = mongoose.model('Brewery', brewerySchema)

export {
  Brewery
}