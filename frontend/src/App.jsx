import React from 'react'
import SidebarDrawer from './components/sideBar/sidebar'
import { AuthProvider } from './context/authContext'
import { useLocation } from 'react-router-dom'

const App = () => {
  const location = useLocation()
  const hideSideBar = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/" || location.pathname === '*'
  return (
    <>
      {!hideSideBar && <SidebarDrawer />}
    </>
  )
}

export default App