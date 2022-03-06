import { Brewery } from "../models/brewery.js";
import https from "https";

function index(req, res) {
  let data = list(req, res)
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
  let url = 'https://api.openbrewerydb.org/breweries?by_name=' + name + '&by_city=' + city + '&by_state=' + state
  https.get(url, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      console.log(data)
      return data;
      // res.send(data);
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
  })
}

function show(req, res) {
  console.log('show page')
}

export {
  index,
  list,
  show,
}