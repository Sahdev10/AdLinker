import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/navbar/Navbar";
import Footer from "../component/footer/Footer";

// import ParticlesBackground from "./components/ParticlesBackground";
// import Background from "./components/background";


function Layout(){
    return( 
        <>
         
        <Navbar/>
        
        <div className=" bg-gradient-to-b from-[#E0F2FE] to-[#CBD5E1] px-6">
        <Outlet/>

        </div>
        <Footer/>
        
        </>
    )
}

export default Layout