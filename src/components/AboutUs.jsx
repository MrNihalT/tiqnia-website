import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const AboutUs = () => {
    const [info, setInfo] = useState({
        aboutUsText: "Loading about us...",
    });

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const docSnap = await getDoc(
                    doc(db, "settings", "general_info")
                );
                if (docSnap.exists()) {
                    setInfo((prev) => ({ ...prev, ...docSnap.data() }));
                }
            } catch (error) {
                console.error("Error fetching about us info:", error);
            }
        };
        fetchInfo();
    }, []);

    return (
        <section className="pb100" id="About-us">
            <div className="container">
                <div className="section_title mb50">
                    <h3 className="title">About Us</h3>
                </div>
                <div className="row justify-content-center">
                    <img src="/assets/img/speakers/m1-1.jpg" alt="WMOIGASC" />
                </div>
                <div className="About mt-4">
                    <p
                        className="text-justify"
                        style={{ whiteSpace: "pre-line", fontWeight: "bold" }}
                    >
                        {info.aboutUsText}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
