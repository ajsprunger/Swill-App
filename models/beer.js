import mongoose from "mongoose";

const Schema = mongoose.Schema

const beerSchema = new Schema({
  name: {type: String, required: true},
  brewery: String,
  reviews: String,
  rating: Number,
  style: String,
})

const Beer = mongoose.model('Beer', beerSchema)

export {
  Beer
}