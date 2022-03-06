import { Router } from "express";
import * as breweriesCtrl from "../controllers/breweries.js"
import { isLoggedIn } from "../middleware/middleware.js";

const router = Router()

// GET - localhost:3000/brewery
router.get('/', breweriesCtrl.index)
// POST 
router.post('/', breweriesCtrl.list)





export {
  router
}