import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10)

    await prisma.user.create({
        data: {
            email: "admin@ABS.com",
            passwordHash,
        },
    })

    console.log("Admin user created")
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
