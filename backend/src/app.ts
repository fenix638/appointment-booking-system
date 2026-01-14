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

app.use("/services/bookings", bookingRoutes);
app.use("/services/availability", availabilityRoutes);
app.use("/services/auth", authRoutes)
app.use("/services/admin/availability", adminAvailabilityRoutes)
app.use("/services/admin/bookings", adminBookingsRoutes)

export default app;
