import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import { routeIndex,routeProfile,signIn,signUp } from "./helpers/routeName"
import Index from "./pages/Index"
import About from "./pages/About"
import { ThemeProvider } from "@/components/themeProvider"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"

function App() {


  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
   <BrowserRouter> 
      <Routes>
         <Route path={routeIndex} element={<Layout/> } >
            <Route index element={<Index />} />

            <Route path={routeProfile} element={ <Profile/> }/>
            <Route path="about" element={ <About/> } />
           
         </Route>

         <Route path={signIn} element={<SignIn />}/>
         <Route path={signUp} element={<SignUp />}/>
      </Routes>
   </BrowserRouter>
   </ThemeProvider>
  )
}

export default App
