import { BrowserRouter, Routes, Route } from "react-router-dom"
import BookingPage from "./pages/BookingPage"
import AdminLogin from "./pages/AdminLogin"
import AdminDashboard from "./pages/AdminDashboard"
import AdminAvailability from "./pages/AdminAvailability"


function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<BookingPage />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/availability" element={<AdminAvailability />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
