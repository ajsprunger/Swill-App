import { Profile } from "../models/profile.js";
import { Review } from "../models/review.js";

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
      title: "User Profiles"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/profiles")
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  // .populate('breweries')
  .populate('reviews')
  .exec(function (err, profile) {
    Profile.findById(req.user.profile._id)
    .then(self => {
      const isSelf = self._id.equals(profile._id)
      res.render("profiles/show", {
        title: `${profile.name}'s profile`,
        profile,
        isSelf
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect("/")
    })
  })
}

function deleteReview(req, res) {
  console.log('delete')
}

export {
  index,
  show,
  deleteReview,
}