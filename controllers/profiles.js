import { Brewery } from "../models/brewery.js";
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
  Profile.findById(req.params.profileId)
  .then(profile => {
    profile.reviews.remove({_id: req.params.reviewId})
    profile.save()
    .then(() =>{
      Review.findById(req.params.reviewId)
      .then(review => {
        console.log('review', review)
        Brewery.findById(review.brewery)
        .then(brewery => {
          console.log('req.params', req.params)
          brewery.reviews.remove({_id: req.params.reviewId})
          brewery.save()
          .then(() => {
            Review.findByIdAndDelete(req.params.reviewId)
            .then(() => {
              res.redirect(`/profiles/${req.params.profileId}`)
            })
          })  
        })
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.params.profileId}`)
  })
}

export {
  index,
  show,
  deleteReview,
}