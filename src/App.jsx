import React, { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import InfoSection from "./components/InfoSection";
import Poster from "./components/Poster";
import AboutEvent from "./components/AboutEvent";
import EventDetails from "./components/EventDetails";
import AboutUs from "./components/AboutUs";
import Department from "./components/Department";
import Partners from "./components/Partners";
import RegisterCTA from "./components/RegisterCTA";
import Footer from "./components/Footer";
import SEO from "./components/SEO";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import { HelmetProvider } from "react-helmet-async";
const Home = () => (
    <>
        <SEO
            title=" IG Fest | TIQNIA 2026 | WMO IG Arts and Science College | IT Fest"
            description="Join TIQNIA 2026 (Tiqnial), the premier Inter-Collegiate IT Fest organized by the Department of Computer Applications at WMO IG Arts and Science College (WMO IG)."
            keywords="ig fest, tiqnia, tiqnial, wmo ig college, WMO IG Arts and Science College, it fest, wmo ig, wmo igasc, computer applications, wayanad college events, tech fest 2026"
        />
        <Header />
        <Hero />
        <InfoSection />
        <Poster />
        <AboutEvent />
        <EventDetails />
        <AboutUs />
        <Department />
        <Partners />
        <RegisterCTA />
        <Footer />
        <Analytics />
    </>
);

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Simulate load time or wait for assets
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="loader">
                <div className="loader-outter"></div>
                <div className="loader-inner"></div>
            </div>
        );
    }

    return (
        <HelmetProvider>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/admin/login" element={<Login />} />
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </Router>
            </AuthProvider>
        </HelmetProvider>
    );
}

export default App;
