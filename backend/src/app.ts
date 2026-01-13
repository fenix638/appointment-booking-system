import dotenv from "dotenv"
dotenv.config()
import express from "express";
import cors from "cors";
import bookingRoutes from "./routes/bookings.routes"
import availabilityRoutes from "./routes/availability.routes"
import authRoutes from "./routes/auth.routes"
import adminAvailabilityRoutes from "./routes/adminAvailability.routes"
import adminBookingsRoutes from "./routes/adminBookings.routes"


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bookings", bookingRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/auth", authRoutes)
app.use("/api/admin/availability", adminAvailabilityRoutes)
app.use("/api/admin/bookings", adminBookingsRoutes)

export default app;
