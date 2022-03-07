import mongoose from "mongoose";

const Schema = mongoose.Schema

const brewerySchema = new Schema({
  breweryId: String,
  reviews: [{type: Schema.Types.ObjectId, ref: "Reviews"}],
}, {
  timestamps: true
})

const Brewery = mongoose.model('Brewery', brewerySchema)

export {
  Brewery
}