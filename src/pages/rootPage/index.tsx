import { Outlet } from "react-router-dom"
import Sidebar from "../../components/sidebar/sidebar"

function RootPage() {

  return (
    <main className="root-page">
      <Sidebar />
      <Outlet />
    </main>
  )

}

export default RootPage