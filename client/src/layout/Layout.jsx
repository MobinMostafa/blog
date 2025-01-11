import Footer from '@/components/footer/Footer'
import AppSidebar from '@/components/sidebar/AppSidebar'
import Header from '@/components/topbar/Header'
import { SidebarProvider, SidebarInset} from '@/components/ui/sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'


const Layout = () => {
  return (

 
     <SidebarProvider> 
      
       <AppSidebar />
       
       <SidebarInset>
        <Header />
        <main className='w-full mt-1'>
          
            <Outlet />
            <Footer />
        </main>
        </SidebarInset>
     </SidebarProvider>
  )
}

export default Layout