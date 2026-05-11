import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import HowTo from "../pages/HowTo";
import NotFound from "../pages/Error404";
import Projects  from "../pages/projects";
import Login from "../pages/login";
import Register from "../pages/register";
import Mensajes from "../components/Mensajes";
import Admin from "../pages/private/Admin";
// import CustomerPortal from "../pages/private/CustomerPortal";

export default function AppRoutes() {

    return (
        <BrowserRouter>
            <Routes>
                {/**Paginas Publicas */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/HowTo" element={<HowTo />} />
                <Route path="/projects" element={<Projects/>}/>

                {/* Not Found  */}
                <Route path="*" element={<NotFound />} />

                {/* loGIN */}

                
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>

                {/**pagina Privadas */}

                <Route path="/admin"  element ={<Admin/>}/>
                 <Route path="/mensajes" element={<Mensajes/>}/>
                    {/* <Route path="/customerPortal" element={<CustomerPortal/>}/>  */}
            </Routes>
        </BrowserRouter>
    )
};