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
    SidebarMenuSub,
    SidebarMenuSubItem,
  } from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Link } from "react-router-dom"
import Logo from '@/assets/images/logo.png'
// import { GalleryVerticalEnd } from "lucide-react"
import { FaHome } from "react-icons/fa";
import { FaBlog } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { FaComments } from "react-icons/fa";
import { FaUserSecret } from "react-icons/fa";
import { ChevronRight } from "lucide-react"


// Menu items.
const items = [
    {
      title: "Home",
      url: "/",
      icon: <FaHome />,
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
        category: true,
        categoryItems: [
            {
                title: "Category 1",
                url: "/about",
            },
            {
                title: "Category 2",
                url: "/about",
            },
            ],
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
    <Sidebar collapsible="icon">
    <SidebarHeader>
       <Link to="/">
        <img src={Logo} alt="logo" className="w-[170px]" />
       </Link>
    </SidebarHeader>
    <SidebarContent>
        <SidebarGroup>
         <SidebarGroupLabel>Application</SidebarGroupLabel>
         <SidebarGroupContent>
            <SidebarMenu>

              {
              
                items.map((item,index) => (
                  <div key={index}>
                  {item.category ? (
               
                    <Collapsible defaultOpen className="group/collapsible">
                    <SidebarMenuItem> 
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                      {item.icon}
                        <Link to={item.url}>
                          {item.title}
                        </Link>
                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      
                       
                            {item.categoryItems.map((categoryItem, index) => (
                            <SidebarMenuSub key={index}>
                            <SidebarMenuSubItem >
                                <Link to={categoryItem.url}>
                                {categoryItem.title}
                                </Link>
                            </SidebarMenuSubItem>
                            </SidebarMenuSub>
                            ))}
                       

                    </CollapsibleContent>
                    </SidebarMenuItem>
                   </Collapsible>
                 
                  ) : (
                    <SidebarMenuItem>
                    <SidebarMenuButton>
                      {item.icon}
                      <Link to={item.url}>
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                  </div>
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

























