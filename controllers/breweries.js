import { Brewery } from "../models/brewery.js";
import https from "https";
import { Profile } from "../models/profile.js";

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
  Brewery.findOneAndUpdate({breweryId:id}, {$push: {"reviews": {rating: req.body.rating, user: user, comment: req.body.comment}}}, {upsert: true}, profileReview(req, res))
}

function profileReview (req, res) {
  Profile.findOneAndUpdate({profileId: req.user.profile._id}, {$push: {}} function(err, profile) {
    profile.breweries.push({"reviews": {rating: req.body.rating, user: user, comment: req.body.comment}})
    profile.save(function(err) {
      if (err) return res.send(500, {error: err})
      return res.redirect(`/breweries/${id}`)  
    })
  })
}

// function (err) {
//   if (err) return res.send(500, {error: err})
//   return res.redirect(`/breweries/${id}`)
// })

export {
  index,
  show,
  createReview,
  profileReview,
}