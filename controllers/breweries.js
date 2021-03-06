import { Brewery } from "../models/brewery.js";
import https from "https";
import { Profile } from "../models/profile.js";
import { Review } from "../models/review.js"
import { profile } from "console";

var url = ''

function index(req, res) {
  let name = req.query.name || ''
  let city = req.query.city || ''
  let state = req.query.state || ''
  let num = 1
  url = 'https://api.openbrewerydb.org/breweries?by_name=' + name + '&by_city=' + city + '&by_state=' + state + '&page=' + num
  let data = '';
  let pageNumber
  https.get(url, (resp) => {
    resp.on('data', (chunk) => {
      data += chunk;
      pageNumber = url.charAt(url.length-1)
    });
    resp.on('end', () => {
      res.render('breweries/index', {
        data: JSON.parse(data),
        title: "Breweries",
        pageNumber: parseInt(num),
        url: url,
      })
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
  })
  return url
}

function page(req, res) {
  let num = req.params.pageNumber
  url = url.split('&page=')[0] +'&page=' + num
  let data = ''
  https.get(url, (resp) => {
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      res.render('breweries/index', {
        data: JSON.parse(data),
        title: "Breweries",
        url: url,
        pageNumber: parseInt(num),
      })
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
  })
}

function show(req, res) {
  let id = req.params.id
  let url = 'https://api.openbrewerydb.org/breweries/' + id
  let data = ''
  https.get(url, (resp) => {
    resp.on('data', (chunk) => {
      data += chunk;
    })
    resp.on('end', () => {
      let parseData = JSON.parse(data)
      Brewery.findOne({breweryId: parseData.id})
      .populate('reviews')
      .exec(function (err, brewery){
        res.render('breweries/show', {
          data: parseData,
          title: parseData.name,
          brewery
        })
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
    Brewery.findOneAndUpdate({breweryId:id}, {breweryId:id, name:parseData.name}, {upsert: true, returnDocument: 'after'}, function (err, brewery) {
      if (err) return res.status(500).send({error: err})
      Review.findOneAndUpdate({brewery:brewery._id, user:user}, {rating: req.body.rating, userName: req.user.profile.name, comment: req.body.comment, breweryId:brewery.breweryId, breweryName:brewery.name}, {upsert: true, returnDocument: 'after'}, function (err, review) {
      if (err) return res.status(500).send({error: err})
      Profile.findOne({_id: user}, function(err, profile) {
        if (err) return res.status(500).send({error: err})
        if(!profile.reviews.some(r => r.equals(review._id))) {
          profile.breweries.push(brewery._id)
          profile.reviews.push(review._id)
          profile.save(function(err) {
              if (err) return res.status(500).send({error: err})
            })
          }
        })
        if(!brewery.reviews.some(r => r.equals(review._id))) {
        brewery.reviews.push(review._id)
        brewery.save(function(err) {
            if (err) return res.status(500).send({error: err})
          })
        }
        return res.redirect(`/breweries/show/${id}`)
        })
      })  
    })
  })
}




export {
  index,
  show,
  createReview,
  page,
}