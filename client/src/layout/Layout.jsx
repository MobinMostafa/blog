import Footer from '@/components/footer/Footer'
import AppSidebar from '@/components/sidebar/AppSidebar'
import Header from '@/components/topbar/Header'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
     <SidebarProvider> 
    
       <AppSidebar />
       <SidebarTrigger/>
       <Header />
        <main>
            <Outlet />
            <Footer />
        </main>
        
     </SidebarProvider>
    </>
  )
}

export default Layout