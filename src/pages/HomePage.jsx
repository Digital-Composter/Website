import React from "react";
import Home from "../components/Home";
import Team from "../components/team/Team";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import Display from "../components/Display";

export default function HomePage() {
    return (
        <div className="bg-amber-50"> {/* Wrapper dengan background dan text color */}
            <Navbar />
            <Home />
            <Carousel />
            <Features />
            <Display />
            <Team />
            <Footer />
        </div>
    );
}

