import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter })

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
