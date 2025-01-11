import React from 'react'
import { Breadcrumb,BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
 import { Separator } from "@/components/ui/separator"
 import {SidebarTrigger} from '@/components/ui/sidebar'

import { SearchForm } from "@/components/search-form"
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { FaSignInAlt } from "react-icons/fa";
import { ModeToggle } from '../model-toggle'

const Header = () => {
  return (
       <header className="flex justify-between sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4 ">         
         <div className='flex items-center gap-4'> 
          <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
           </div>
            <div>
                 <SearchForm className="md:w-[20rem]"/> 
            </div>
            <div className='flex items-center gap-4'>
             
                <ModeToggle />
                <Button asChild>        
                    <Link to="/signin">
                      <FaSignInAlt />
                        Sign in
                     </Link>
                </Button>
            </div>
          </header>
  )
}

export default Header