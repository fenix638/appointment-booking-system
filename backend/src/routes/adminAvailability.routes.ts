import { Router } from "express"
import {
    setAvailability,
    getAllAvailability,
} from "../controllers/adminAvailability.controller"
import { requireAdmin } from "../middleware/auth.middleware"

const router = Router()

router.use(requireAdmin)

router.post("/", setAvailability)
router.get("/", getAllAvailability)

export default router
