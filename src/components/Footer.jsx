import React, { useState, useEffect } from "react";
import {
    doc,
    getDoc,
    addDoc,
    collection,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const Footer = () => {
    const [contactEmail, setContactEmail] = useState("nihal.chiyoor@gmail.com");
    const [senderEmail, setSenderEmail] = useState("");

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const docSnap = await getDoc(
                    doc(db, "settings", "general_info")
                );
                if (docSnap.exists() && docSnap.data().contactEmail) {
                    setContactEmail(docSnap.data().contactEmail);
                }
            } catch (error) {
                console.error("Error fetching contact email:", error);
            }
        };
        fetchInfo();
    }, []);

    const handleSendEmail = async () => {
        if (!senderEmail) {
            alert("Please enter your email.");
            return;
        }
        try {
            await addDoc(collection(db, "messages"), {
                email: senderEmail,
                date: serverTimestamp(),
            });
            alert("Message sent! We will contact you soon.");
            setSenderEmail("");
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Error sending message.");
        }
    };

    return (
        <>
            <footer>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-4 col-12">
                            <div className="footer_box">
                                <div className="footer_header">
                                    <div className="footer_logo">
                                        <img
                                            src="/assets/img/logo2.png"
                                            alt="evento"
                                        />
                                    </div>
                                </div>
                                <div className="footer_box_body" id="contact">
                                    <h2>Contacts</h2>
                                    <p>
                                        Phone numbers:
                                        <br />
                                        <br />
                                        <a href="tel:+91-9526110811">
                                            Nihal: +91-7736697341
                                        </a>
                                        <br />
                                        <a href="tel:+91-8129763260">
                                            Faadi: +91-8129763260
                                        </a>
                                        <br />
                                        <a href="tel:+91-9061874787">
                                            Hisham: +91-9061874787
                                        </a>
                                        <br />
                                        <a href="tel:+91-9633216991">
                                            Adnan: +91-9633216991
                                        </a>
                                        <br />
                                        <br />
                                        <h2>E-mail</h2>
                                        <a href={`mailto:${contactEmail}`}>
                                            {contactEmail}
                                        </a>
                                    </p>
                                    <ul className="footer_social">
                                        <li>
                                            <a
                                                href="https://www.facebook.com/people/Wmo-Igasc-Koolivayal/100082502052680/?mibextid=ZbWKwL"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <i className="ion-social-facebook"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://maps.app.goo.gl/1rNWjQNphhxcarrSA"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <i className="ion-location"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.wmoigasc.co.in/">
                                                <i className="ion-social-dribbble"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://www.instagram.com/wmo_igasc__?igsh=MjA1MWZsaTA1aWd5"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <i className="ion-social-instagram"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="footer_box">
                                <div className="footer_header">
                                    <h4 className="footer_title">instagram</h4>
                                </div>
                                <div className="footer_box_body">
                                    <ul className="instagram_list">
                                        <li>
                                            <a href="https://www.instagram.com/bceeyeah?igsh=MTJzMWExdjN3N2FuZQ==">
                                                <img
                                                    src="../../public/assets/img/insta1.jpg"
                                                    alt="instagram"
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.instagram.com/bceeyeah?igsh=MTJzMWExdjN3N2FuZQ==">
                                                <img
                                                    src="../../public/assets/img/insta2.jpg"
                                                    alt="instagram"
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.instagram.com/bceeyeah?igsh=MTJzMWExdjN3N2FuZQ==">
                                                <img
                                                    src="../../public/assets/img/insta3.jpg"
                                                    alt="instagram"
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.instagram.com/bceeyeah?igsh=MTJzMWExdjN3N2FuZQ==">
                                                <img
                                                    src="../../public/assets/img/insta4.jpg"
                                                    alt="instagram"
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.instagram.com/tiqnia2023/">
                                                <img
                                                    src="../../public/assets/img/insta5.jpg"
                                                    alt="instagram"
                                                />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.instagram.com/tiqnia2023/">
                                                <img
                                                    src="../../public/assets/img/insta6.jpg"
                                                    alt="instagram"
                                                />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="footer_box">
                                <div className="footer_header">
                                    <h4 className="footer_title">
                                        send a mail to our team
                                    </h4>
                                </div>
                                <div className="footer_box_body">
                                    <div className="newsletter_form">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Your E-Mail here"
                                            value={senderEmail}
                                            onChange={(e) =>
                                                setSenderEmail(e.target.value)
                                            }
                                        />
                                        <button
                                            onClick={handleSendEmail}
                                            className="btn btn-rounded btn-block btn-primary"
                                            style={{
                                                color: "white",
                                                display: "block",
                                                marginTop: "10px",
                                                textAlign: "center",
                                                width: "100%",
                                                cursor: "pointer",
                                            }}
                                        >
                                            SEND
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <iframe
                                className="map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4480.771482451472!2d76.057215!3d11.7613328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba5dfb730ea41c3%3A0x23d36ebf31438ad7!2sWMO%20Imam%20Gazzali%20Arts%20%26%20Science%20College!5e1!3m2!1sen!2sin!4v1767132613023!5m2!1sen!2sin"
                                width="200"
                                height="200"
                                style={{
                                    border: 0,
                                    width: "100%",
                                    marginTop: "20px",
                                }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="copyright_footer">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-12">
                            <p>
                                Copyright &copy; {new Date().getFullYear()} All
                                rights reserved | This website is developed by{" "}
                                <a
                                    href="http://www.nihalt.in"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Nihal T
                                </a>
                            </p>
                        </div>
                        <div className="col-12 col-md-6 ">
                            <ul className="footer_menu">
                                <li>
                                    <a href="#">Home</a>
                                </li>
                                <li>
                                    <a
                                        className="nav-link "
                                        href="#about-event"
                                    >
                                        Events
                                    </a>
                                </li>
                                <li>
                                    <a className="nav-link " href="#About-us">
                                        About US
                                    </a>
                                </li>
                                <li>
                                    <a className="nav-link " href="#BCA">
                                        BCA
                                    </a>
                                </li>
                                <li>
                                    <a className="nav-link " href="#contact">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
