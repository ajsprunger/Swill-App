import { Brewery } from "../models/brewery.js";
import https from "https";
import { Profile } from "../models/profile.js";
import { Review } from "../models/review.js"
import { profile } from "console";

function index(req, res) {
  let name = req.query.name || ''
  let city = req.query.city || ''
  let state = req.query.state || ''
  let url = 'https://api.openbrewerydb.org/breweries?by_name=' + name + '&by_city=' + city + '&by_state=' + state
  let data = '';
  https.get(url, (resp) => {
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      res.render('breweries/index', {
        data: JSON.parse(data),
        title: "Breweries"
      })
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
  })
}

function show(req, res) {
  let id = req.originalUrl
  let url = 'https://api.openbrewerydb.org' + id
  let data = ''
  https.get(url, (resp) => {
    resp.on('data', (chunk) => {
      data += chunk;
    })
    resp.on('end', () => {
      res.render('breweries/show', {
        data: JSON.parse(data),
        title: data.name
      })
    })
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
  })
}

function createReview(req, res) {
  let user = req.user.profile._id
  let id = req.params.id
  let url = 'https://api.openbrewerydb.org/breweries/' + id
  let data = ''
  https.get(url, (resp) => {
    resp.on('data', (chunk) => {
      data += chunk;
    })
  //create review
  resp.on('end', () => {
    let parseData = JSON.parse(data)
    console.log('data', parseData)
    Brewery.findOneAndUpdate({breweryId:id}, {breweryId:id, name:parseData.name}, {upsert: true, returnDocument: 'after'}, function (err, brewery) {
      if (err) return res.send(500, {error: err})
      //create review
      Review.findOneAndUpdate({brewery:brewery._id, user:user}, {rating: req.body.rating, user: user, comment: req.body.comment, brewery:brewery._id}, {upsert: true, returnDocument: 'after'}, function (err, review) {
        //create link to review in profile
        if (err) return res.send(500, {error: err})
        Profile.findOne({profileId: user}, function(err, profile) {
          if (err) return res.send(500, {error: err})
          profile.breweries.push(brewery._id)
          profile.save(function(err) {
              if (err) return res.send(500, {error: err})
            })
        })
        brewery.reviews.push(review._id)
        brewery.save(function(err) {
            if (err) return res.send(500, {error: err})
          })
        return res.redirect(`/breweries/${id}`)
        })
      })  
    })
  })
}

// function createReview(req, res) {
//   let user = req.user.profile._id
//   let id = req.params.id
//   Review.findOneAndUpdate({breweryId:id}, {$push: {"reviews": {rating: req.body.rating, user: user, comment: req.body.comment}}}, {upsert: true}, function (err) {
//     if (err) return res.send(500, {error: err})
//     return res.redirect(`/breweries/${id}`)
//   }) 
// }

// function profileReview (req, res) {
//   Profile.findOneAndUpdate({profileId: req.user.profile._id}, {$push: {}} function(err, profile) {
//     profile.breweries.push({"reviews": {rating: req.body.rating, user: user, comment: req.body.comment}})
//     profile.save(function(err) {
//       if (err) return res.send(500, {error: err})
//       return res.redirect(`/breweries/${id}`)  
//     })
//   })
// }


export {
  index,
  show,
  createReview,
}