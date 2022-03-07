import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  breweries: [{type: Schema.Types.ObjectId, ref: "Brewery"}],
  reviews: [{type: Schema.Types.ObjectId, ref: "Review"}],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
