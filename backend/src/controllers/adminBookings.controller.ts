import { Response } from "express"
import prisma from "../lib/prisma"
import { AuthRequest } from "../middleware/auth.middleware"

export async function getBookings(_: AuthRequest, res: Response) {
    const bookings = await prisma.booking.findMany({
        orderBy: { createdAt: "desc" },
    })

    res.json(bookings)
}

export async function cancelBooking(req: AuthRequest, res: Response) {
    const { id } = req.params ? req.params : req.body

    const booking = await prisma.booking.update({
        where: { id },
        data: { status: "CANCELLED" },
    })

    res.json(booking)
}
