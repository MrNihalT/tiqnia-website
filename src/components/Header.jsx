import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NavLinks = () => (
    <ul className="nav navbar-nav menu">
        <li className="nav-item">
            <a className="nav-link active" href="#">
                Home
            </a>
        </li>
        <li className="nav-item">
            <a className="nav-link " href="#about-event">
                Events
            </a>
        </li>
        <li className="nav-item">
            <a className="nav-link " href="#About-us">
                About US
            </a>
        </li>
        <li className="nav-item">
            <a className="nav-link " href="#BCA">
                BCA
            </a>
        </li>
        <li className="nav-item">
            <a className="nav-link " href="#contact">
                Contact
            </a>
        </li>
    </ul>
);

const Header = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header
            className={`header navbar fixed-top navbar-expand-md ${
                isSticky ? "sticky_header" : ""
            }`}
        >
            <div className="container">
                <a className="navbar-brand logo" href="#">
                    <img src="/assets/img/LOGO.png" alt="Evento" />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                >
                    <span className="lnr lnr-text-align-right"></span>
                    <i className="fa fa-bars" style={{ color: "#fff" }}></i>
                </button>

                {/* Desktop Menu - Hidden on mobile */}
                <div
                    className="collapse navbar-collapse flex-sm-row-reverse d-none d-md-flex"
                    id="headernav"
                >
                    <NavLinks />
                </div>

                {/* Mobile Menu - Animated */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="d-md-none navbar-collapse flex-sm-row-reverse"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                        >
                            <NavLinks />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Header;
