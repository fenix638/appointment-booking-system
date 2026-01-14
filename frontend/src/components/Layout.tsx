import type { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <header className="border-b bg-white">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between">
                    <span className="font-semibold">Appointment Booking</span>
                    <a
                        href="/admin/login"
                        className="text-sm text-gray-600 hover:text-black"
                    >
                        Admin
                    </a>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-10">
                {children}
            </main>
        </div>
    )
}
