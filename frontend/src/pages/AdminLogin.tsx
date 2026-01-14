import { useState } from "react"
import api from "../services/api"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"


export default function AdminLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function login() {
        const res = await api.post("/auth/login", { email, password })
        localStorage.setItem("token", res.data.token)
        navigate("/admin/dashboard")
    }

    return (
        <motion.div className="min-h-screen flex items-center justify-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white p-6 shadow rounded space-y-4">
                <h1 className="text-xl font-semibold">Admin Login</h1>

                <input
                    placeholder="Email"
                    className="border p-2 w-full"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button onClick={login} className="bg-black text-white w-full p-2">
                    Login
                </button>
            </div>
        </motion.div>
    )
}
