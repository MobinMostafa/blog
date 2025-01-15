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
        <main>
            <div className='w-full min-h-[calc(100vh-40px)] flex items-center justify-center py-5'>
            <Outlet />
            </div>
          
        </main>
     
           <Footer />
  
        </SidebarInset>
     </SidebarProvider>
  )
}

export default Layout