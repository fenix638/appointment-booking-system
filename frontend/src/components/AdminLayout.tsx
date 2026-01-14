import type { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <div className="flex gap-4 mb-6 border-b p-2 ">
                <a href="/admin/dashboard" className="text-sm underline">
                    Bookings
                </a>
                <a href="/admin/availability" className="text-sm underline">
                    Availability
                </a>
            </div>

            {children}
        </div>
    )
}
