import { Brewery } from "../models/brewery.js";
import https from "https";

function index(req, res) {
  list(req, res)
  console.log(data)
  .then(data => {
    res.render('breweries/index', {
      data,
      title: "Breweries"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/breweries")
  })
}

function list(req, res) {
  let name = req.body.name
  let city = req.body.city
  let state = req.body.state
  console.log(name)
  let url = 'https://api.openbrewerydb.org/breweries?by_name=' + name + '&by_city=' + city + '&by_state=' + state
  https.get(url, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      res.send(data)
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
  })
}

export {
  index,
  list,
}