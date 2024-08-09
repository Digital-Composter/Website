import React from "react";
import HeaderDashboard from "../components/HeaderDashboard";
import Display from "../components/Display";
import Footer from "../components/Footer";

export default function Dashboard() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <HeaderDashboard/>
            <Display/>
            <Footer/>
        </div>
    );
}
