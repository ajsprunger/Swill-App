import { Beer } from "../models/beer.js";

function index(req, res) {
  Beer.find({})
  .then(beers => {
    res.render('beers/index', {
      beers,
      title: "Beers"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/beers")
  })
}

export {
  index,
}