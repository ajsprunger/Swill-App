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
  let showData = ''
  https.get(url, (resp) => {
    resp.on('end', () => {
      res.render('breweries/show', {
        showData: JSON.parse(showData),
        title: req.brewery.name
      })
    })
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
  })
}

export {
  index,
  show,
}