import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

export async function sendBookingConfirmationEmail(
    to: string,
    name: string,
    date: string,
    time: string
) {
    const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5">
      <h2>Appointment Confirmed</h2>
      <p>Hi <strong>${name}</strong>,</p>
      <p>Your appointment has been confirmed.</p>
      <p>
        <strong>Date:</strong> ${date}<br />
        <strong>Time:</strong> ${time}
      </p>
      <p>See you soon 👋</p>
    </div>
  `

    await transporter.sendMail({
        from: `"Appointments" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Your appointment is confirmed",
        html,
    })
}
