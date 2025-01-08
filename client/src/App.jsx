import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import { routeIndex } from "./helpers/routeName"
import Index from "./pages/Index"
import About from "./pages/About"

function App() {


  return (

   <BrowserRouter> 
      <Routes>
         <Route path={routeIndex} element={<Layout/> } >
            <Route index element={<Index />} />
            <Route path="about" element={ <About/> } />
         </Route>
      </Routes>
   </BrowserRouter>

  )
}

export default App
