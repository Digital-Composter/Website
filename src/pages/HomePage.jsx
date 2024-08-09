import React from "react";
import Home from "../components/Home";
import Team from "../components/team/Team";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";

export default function HomePage () {
    return (
        <>
            <Navbar/>
            <Home/>
            <Carousel/>
            <Features/>
            <Team/>
            <Footer/>
            
        
        </>
    );
}
