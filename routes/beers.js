import { Router } from "express";
import * as beersCtrl from "../controllers/beers.js"
import { isLoggedIn } from "../middleware/middleware.js";

const router = Router()

// GET - localhost:3000/beers
router.get('/', beersCtrl.index)





export {
  router
}