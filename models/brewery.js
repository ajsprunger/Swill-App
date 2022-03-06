import mongoose from "mongoose";

const Schema = mongoose.Schema

const brewerySchema = new Schema({
  name: {type: String, required: true},
  brewery: String,
  reviews: [],
  rating: Number,
  style: String,
})

const Brewery = mongoose.model('Brewery', brewerySchema)

export {
  Brewery
}