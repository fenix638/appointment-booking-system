import { Response } from "express"
import prisma from "../lib/prisma"
import { AuthRequest } from "../middleware/auth.middleware"

export async function setAvailability(req: AuthRequest, res: Response) {
    const { date, startTime, endTime } = req.body

    const day = new Date(date)
    day.setHours(0, 0, 0, 0)

    const availability = await prisma.availability.upsert({
        where: { date: day },
        update: { startTime, endTime },
        create: { date: day, startTime, endTime },
    })

    res.json(availability)
}

export async function getAllAvailability(_: AuthRequest, res: Response) {
    const availability = await prisma.availability.findMany({
        orderBy: { date: "asc" },
    })

    res.json(availability)
}
