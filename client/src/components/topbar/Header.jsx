import React from 'react'
import { Breadcrumb,BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
 import { Separator } from "@/components/ui/separator"
 import {SidebarTrigger} from '@/components/ui/sidebar'

import { SearchForm } from "@/components/search-form"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt } from "react-icons/fa";
import { ModeToggle } from '../model-toggle'
import { useDispatch, useSelector } from 'react-redux'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaUserCircle } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { removeUser } from '@/redux/user/user.slice'
import { showToast } from "@/helpers/showToast"
import { getEnv } from "@/helpers/getEnv"
import { routeIndex, routeProfile } from "@/helpers/routeName"




const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user )
  const handleLogout = async () => {
         try {
             const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/logout`,{
                 method: 'GET',
                 credentials: 'include',
               }
             )
            
            const data = await response.json() 
             if(!response.ok){
               showToast('error', data.message)
               return
             }
             
             showToast('success', data.message)
      
             dispatch(removeUser())
             navigate(routeIndex)
             // console.log(values)
           } catch (error) {
            return  showToast('error', error.message)
           }
  }
  return (
       <header className="flex justify-between sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4 z-10">         
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
            <div className='flex items-center gap-9'>
             
                <ModeToggle />
              {
               !user.isLoggedIn ? 
                 <Button asChild>        
                    <Link to="/signin">
                      <FaSignInAlt />
                        Sign in
                     </Link>
                </Button>
                : <>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage src={user.user.avatar }  />
                        <AvatarFallback> <FaUserCircle size={30} /></AvatarFallback>  
                    </Avatar>

                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>
                        <p>{user.user.name}</p>
                        <p className='text-sm'>{user.user.email}</p>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link to={routeProfile} >
                        <FaRegUser />
                        Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link to="">
                        <FaPlus/>
                        Add blog
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator/>
                      <DropdownMenuItem asChild className="cursor-pointer">
                         <p onClick={handleLogout} className='pointer'>
                          <RiLogoutCircleRLine color='red' />
                          Logout
                          </p>
                      </DropdownMenuItem>
                     
                    </DropdownMenuContent>
                  </DropdownMenu>

                </>
              }
            </div>
          </header>
  )
}

export default Header