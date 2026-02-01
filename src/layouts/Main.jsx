import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

export default function Main() {
  return (
    <>
      <Navbar />
      <main className="mt-4 ">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

