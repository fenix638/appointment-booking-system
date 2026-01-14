import { useEffect, useState } from "react"
import api from "../services/api"
import AdminLayout from "../components/AdminLayout";
import { motion } from "framer-motion";

interface Availability {
    id: string
    date: string
    startTime: string
    endTime: string
}

export default function AdminAvailability() {
    const [date, setDate] = useState("")
    const [startTime, setStartTime] = useState("09:00")
    const [endTime, setEndTime] = useState("17:00")
    const [availability, setAvailability] = useState<Availability[]>([])
    const [loading, setLoading] = useState(false)

    async function loadAvailability() {
        const res = await api.get("/admin/availability")
        setAvailability(res.data)
    }

    useEffect(() => {
        loadAvailability()
    }, [])

    async function save() {
        if (!date) return

        setLoading(true)
        await api.post("/admin/availability", {
            date,
            startTime,
            endTime,
        })
        setLoading(false)
        setDate("")
        await loadAvailability()
    }

    return (
        <AdminLayout>
            <motion.div className="mx-auto max-w-xl space-y-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-2xl font-bold">Set Availability</h1>

                <div className="bg-white p-4 rounded shadow space-y-3">
                    <input
                        type="date"
                        className="border p-2 w-full rounded"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />

                    <div className="flex gap-2">
                        <input
                            type="time"
                            className="border p-2 w-full rounded"
                            value={startTime}
                            onChange={e => setStartTime(e.target.value)}
                        />
                        <input
                            type="time"
                            className="border p-2 w-full rounded"
                            value={endTime}
                            onChange={e => setEndTime(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={save}
                        disabled={!date || loading}
                        className="w-full bg-black text-white p-2 rounded disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Save availability"}
                    </button>
                </div>

                <div>
                    <h2 className="font-semibold mb-2">Existing availability</h2>

                    <ul className="space-y-2">
                        {availability.map(a => (
                            <li
                                key={a.id}
                                className="bg-white p-3 rounded shadow flex justify-between"
                            >
                <span>
                  {new Date(a.date).toLocaleDateString()} —{" "}
                    {a.startTime} / {a.endTime}
                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </AdminLayout>
    )
}
