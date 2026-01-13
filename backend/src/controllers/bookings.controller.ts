import { Request, Response } from "express"
import { z } from "zod"
import prisma from "../lib/prisma"
import { generateTimeSlots } from "../utils/timeSlots"

const bookingSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    date: z.string(),
    time: z.string(),
})

export async function createBooking(req: Request, res: Response) {
    const parsed = bookingSchema.safeParse(req.body)

    if (!parsed.success) {
        return res.status(400).json(parsed.error)
    }

    const { name, email, date, time } = parsed.data

    const day = new Date(date)
    day.setHours(0, 0, 0, 0)

    const availability = await prisma.availability.findUnique({
        where: { date: day },
    })

    if (!availability) {
        return res.status(400).json({ message: "No availability for this date" })
    }

    const slots = generateTimeSlots(
        availability.startTime,
        availability.endTime
    )

    if (!slots.includes(time)) {
        return res.status(400).json({ message: "Invalid time slot" })
    }

    const existing = await prisma.booking.findFirst({
        where: {
            date: day,
            time,
            status: "CONFIRMED",
        },
    })

    if (existing) {
        return res.status(409).json({ message: "Slot already booked" })
    }

    const booking = await prisma.booking.create({
        data: {
            name,
            email,
            date: day,
            time,
        },
    })

    res.status(201).json(booking)
}
