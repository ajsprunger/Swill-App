import { Brewery } from "../models/brewery.js";
import https from "https";

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
  console.log('user', req.params.userId)
  let id = req.params.id
  const brewery = new Brewery(req.body, id)
  brewery.save(function (err) {
    if (err) return
    res.redirect(`/breweries`)
  })
}

export {
  index,
  show,
  createReview,
}