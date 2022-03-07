import mongoose from "mongoose";

const Schema = mongoose.Schema

const brewerySchema = new Schema({
  breweryId: String,
  reviews: [{rating: Number, user: String, comment: String}],
})

const Brewery = mongoose.model('Brewery', brewerySchema)

export {
  Brewery
}