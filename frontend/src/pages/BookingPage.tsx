import { useEffect, useState } from "react"
import api from "../services/api"
import { motion } from "framer-motion"


export default function BookingPage() {
    const [date, setDate] = useState("")
    const [slots, setSlots] = useState<string[]>([])
    const [time, setTime] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")



    useEffect(() => {
        if (!date) return
        api.get(`/availability?date=${date}`).then(res => {
            setSlots(res.data.slots)
        })
    }, [date])

    async function submit() {
        try {
            setError("")
            setLoading(true)
            await api.post("/bookings", { name, email, date, time })
            setSuccess(true)
        } catch (e: any) {
            setError(e.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="p-6 bg-white shadow rounded">
                    <h2 className="text-xl font-semibold">Booking confirmed 🎉</h2>
                    <p>Check your email for confirmation.</p>
                </div>
            </div>
        )
    }

    return (
        <motion.div className="min-h-screen flex items-center justify-center bg-gray-50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white p-8 shadow rounded w-full max-w-md space-y-4">
                <h1 className="text-2xl font-bold text-center">Book an Appointment</h1>

                <input
                    type="date"
                    className="w-full border p-2 rounded"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />

                <div className="grid grid-cols-3 gap-2">
                    {slots.map(slot => (
                        <button
                            key={slot}
                            onClick={() => setTime(slot)}
                            className={`px-3 py-2 rounded-full text-sm border transition
                            ${time === slot
                                ? "bg-black text-white"
                                : "hover:bg-gray-100"
                            }`}
                        >
                            {slot}
                        </button>
                    ))}
                    {date && slots.length === 0 && (
                        <p className="text-sm text-gray-500 text-center">
                            No available slots for this date
                        </p>
                    )}
                </div>

                <input
                    placeholder="Name"
                    className="w-full border p-2 rounded"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <input
                    placeholder="Email"
                    className="w-full border p-2 rounded"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <button
                    onClick={submit}
                    disabled={loading || !date || !time}
                    className="w-full bg-black text-white p-2 rounded disabled:opacity-50"
                >
                    {loading ? "Booking..." : "Book"}
                </button>

                {error && (
                    <div className="bg-red-50 text-red-700 p-2 rounded text-sm">
                        {error}
                    </div>
                )}

            </div>
        </motion.div>
    )
}
