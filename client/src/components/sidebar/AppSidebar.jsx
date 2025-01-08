import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import Logo from '@/assets/images/logo.png'
import { IoHomeOutline } from "react-icons/io5";
import { FaBlog } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { FaComments } from "react-icons/fa";
import { FaUserSecret } from "react-icons/fa";


// Menu items.
const items = [
    {
      title: "Home",
      url: "/",
      icon: <IoHomeOutline />,
    },
    {
      title: "Blogs",
      url: "/about",
      icon: <FaBlog />,
    },
    {
        title: "Categories",
        url: "/about",
        icon: <MdCategory />,
    },
    {
        title: "Comments",
        url: "/about",
        icon: <FaComments />,
    },
    {
        title: "Users",
        url: "/about",
        icon: <FaUserSecret />,
    }
  ]

const AppSidebar = () => {
  return (
    <Sidebar className="bg-white">
    <SidebarHeader>
        <img src={Logo} alt="logo" />
    </SidebarHeader>
    <SidebarContent >
        <SidebarGroup>
         <SidebarGroupLabel>Application</SidebarGroupLabel>
         <SidebarGroupContent>
            <SidebarMenu>
              {
                items.map((item,index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton>
                         {item.icon}
                        <Link to={item.url}>
                            {item.title}
                        </Link>
                
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
            }
            </SidebarMenu>
         </SidebarGroupContent>
        </SidebarGroup>
     
    </SidebarContent>
    <SidebarFooter />
  </Sidebar>
  )
}

export default AppSidebar