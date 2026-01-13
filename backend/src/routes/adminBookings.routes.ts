import { Router } from "express"
import {
    getBookings,
    cancelBooking,
} from "../controllers/adminBookings.controller"
import { requireAdmin } from "../middleware/auth.middleware"

const router = Router()

router.use(requireAdmin)

router.get("/", getBookings)
router.delete("/:id", cancelBooking)

export default router
