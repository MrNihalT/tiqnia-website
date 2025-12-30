import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const RegisterCTA = () => {
    const [info, setInfo] = useState({
        registerCtaText:
            "Registered to the IT FEST (TIQNIA2023) conducted by department of COMPUTER APPLICATION of wmo ig arts and science college Kappumchal,panamaram.",
        registerCtaButtonText: "Register Now",
        registrationUrl: "https://forms.gle/t6vWyAET3kV4boHd7",
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
                console.error("Error fetching CTA info:", error);
            }
        };
        fetchInfo();
    }, []);

    return (
        <section
            className="bg-img pt100 pb100"
            style={{ backgroundImage: "url('/assets/img/bg/tickets.png')" }}
        >
            <div className="container">
                <div className="section_title mb30">
                    <h3 className="title color-light">Get Registered</h3>
                </div>
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-9 text-md-left text-center color-light">
                        {info.registerCtaText}
                    </div>
                    <div className="col-md-3 text-md-right text-center">
                        <a
                            href={info.registrationUrl}
                            className="btn btn-primary btn-rounded mt30"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {info.registerCtaButtonText}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterCTA;
