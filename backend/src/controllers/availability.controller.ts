import { Request, Response } from "express"
import prisma from "../lib/prisma"
import { generateTimeSlots } from "../utils/timeSlots"

export async function getAvailability(req: Request, res: Response) {
    const date = req.query.date as string

    if (!date) {
        return res.status(400).json({ message: "Date is required" })
    }

    const day = new Date(date)
    day.setHours(0, 0, 0, 0)

    const availability = await prisma.availability.findUnique({
        where: { date: day },
    })

    if (!availability) {
        return res.json({ slots: [] })
    }

    const slots = generateTimeSlots(
        availability.startTime,
        availability.endTime
    )

    const bookings = await prisma.booking.findMany({
        where: {
            date: day,
            status: "CONFIRMED",
        },
        select: { time: true },
    })

    const bookedTimes = bookings.map(b => b.time)

    const availableSlots = slots.filter(slot => !bookedTimes.includes(slot))

    res.json({ slots: availableSlots })
}
