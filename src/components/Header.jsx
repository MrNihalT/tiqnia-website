import React, { useState, useEffect } from "react";

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
                    <img src="/assets/img/logo2.png" alt="Evento" />
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
                <div
                    className={`collapse navbar-collapse flex-sm-row-reverse ${
                        isMenuOpen ? "show" : ""
                    }`}
                    id="headernav"
                >
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
                </div>
            </div>
        </header>
    );
};

export default Header;
