import { useEffect, useState } from "react"
import api from "../services/api"
import { motion } from "framer-motion"
import AdminLayout from "../components/AdminLayout"


export default function AdminDashboard() {
    const [bookings, setBookings] = useState<any[]>([])

    useEffect(() => {
        api.get("/admin/bookings").then(res => setBookings(res.data))
    }, [])

    async function cancel(id: string) {
        if (!confirm("Cancel this booking?")) return
        await api.delete(`/admin/bookings/${id}`)
        setBookings(bookings.filter(b => b.id !== id))
    }

    return (
        <AdminLayout>
            <motion.div className="p-8"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}>



                <h1 className="text-2xl font-bold mb-4">Bookings</h1>

                <table className="w-full border">
                    <thead>
                    <tr>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Date</th>
                        <th className="border p-2">Time</th>
                        <th className="border p-2">Status</th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>
                    {bookings.map(b => (
                        <tr key={b.id}>
                            <td className="border p-2">{b.name}</td>
                            <td className="border p-2">{b.email}</td>
                            <td className="border p-2">
                                {new Date(b.date).toLocaleDateString()}
                            </td>
                            <td className="border p-2">{b.time}</td>
                            <td className="border p-2">
                                  <span className={`px-2 py-1 rounded text-xs ${
                                      b.status === "CONFIRMED"
                                          ? "bg-green-100 text-green-700"
                                          : "bg-gray-100 text-gray-600"
                                  }`}>
                                    {b.status}
                                  </span>
                            </td>
                            <td className="border p-2">
                                <button
                                    onClick={() => cancel(b.id)}
                                    className="text-red-600"
                                >
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </motion.div>
        </AdminLayout>
    )
}
