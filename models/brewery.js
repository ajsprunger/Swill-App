import mongoose from "mongoose";

const Schema = mongoose.Schema

const brewerySchema = new Schema({
  name: String,
  breweryId: String,
  reviews: [{type: Schema.Types.ObjectId, ref: "Review"}],
}, {
  timestamps: true
})

const Brewery = mongoose.model('Brewery', brewerySchema)

export {
  Brewery
}