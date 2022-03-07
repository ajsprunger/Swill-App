import { Router } from "express";
import * as breweriesCtrl from "../controllers/breweries.js"
import { isLoggedIn } from "../middleware/middleware.js";

const router = Router()

// GET - localhost:3000/brewery
router.get('/', breweriesCtrl.index)
// POST - localhost:3000/brewery
router.post('/', breweriesCtrl.index)
// GET - localhost:3000/brewery/:id
router.get('/:id', breweriesCtrl.show)





export {
  router
}