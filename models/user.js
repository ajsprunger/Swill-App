import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  googleId: String,
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
}, {
  timestamps: true,
})

const User = mongoose.model('User', userSchema)

export {
  User
}
