export function generateTimeSlots(
    startTime: string,
    endTime: string,
    intervalMinutes = 30
): string[] {
    const slots: string[] = []

    let [startHour, startMinute] = startTime.split(":").map(Number)
    let [endHour, endMinute] = endTime.split(":").map(Number)

    let current = startHour * 60 + startMinute
    const end = endHour * 60 + endMinute

    while (current + intervalMinutes <= end) {
        const h = Math.floor(current / 60)
        const m = current % 60
        slots.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`)
        current += intervalMinutes
    }

    return slots
}
