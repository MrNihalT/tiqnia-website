import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import InfoSection from "./components/InfoSection";
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

const Home = () => (
    <>
        <SEO
            title="TIQNIA 2026 | IG Fest | WMO IG College"
            description="TIQNIA 2026 - Inter Collegiate IT Fest by Dept of Computer Applications, WMO IG Arts & Science College."
            keywords="ig fest, wmo ig college, it fest wmo, tiqnia, tiqnia 2026"
        />
        <Header />
        <Hero />
        <InfoSection />
        <AboutEvent />
        <EventDetails />
        <AboutUs />
        <Department />
        <Partners />
        <RegisterCTA />
        <Footer />
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
    );
}

export default App;
