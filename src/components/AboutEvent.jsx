import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const AboutEvent = () => {
    const [info, setInfo] = useState({
        aboutEventText: "Loading event details...",
        eventCount: "8",
        card1Title: "Events",
        card1Link: "https://forms.gle/t6vWyAET3kV4boHd7",
        card2Title: "Treasure Hunt",
        card2Link: "https://forms.gle/t6vWyAET3kV4boHd7",
        card3Title: "Spot Games",
        card3Link: "https://forms.gle/t6vWyAET3kV4boHd7",
        card4Title: "Time",
        card4Link: "https://forms.gle/t6vWyAET3kV4boHd7",
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
                console.error("Error fetching about info:", error);
            }
        };
        fetchInfo();
    }, []);

    return (
        <section className="pt100 pb100">
            <div className="container">
                <div className="section_title" id="about-event">
                    <h3 className="title">About the event</h3>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <p style={{ whiteSpace: "pre-line" }}>
                            {info.aboutEventText}
                        </p>
                    </div>
                </div>

                <div className="row justify-content-center mt30">
                    <div className="col-12 col-md-6 col-lg-3 mb-4">
                        <div className="icon_box_one h-100">
                            <i className="ion-ios-calendar-outline"></i>
                            <div className="content">
                                <h4>
                                    {info.eventCount} {info.card1Title}
                                </h4>
                                <p>
                                    There will be {info.eventCount} interesting
                                    events with attractive cash prizes.
                                </p>
                                <a
                                    href={
                                        info.card1Link || info.registrationUrl
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    click to register
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-4">
                        <div className="icon_box_one h-100">
                            <i className="ion-ios-search"></i>
                            <div className="content">
                                <h4>{info.card2Title}</h4>
                                <p>
                                    Treasure hunt -only first 10 teams of
                                    maximum of 3 persons in a team.
                                </p>
                                <a
                                    href={
                                        info.card2Link || info.registrationUrl
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    click to register
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-4">
                        <div className="icon_box_one h-100">
                            <i className="lnr lnr-rocket"></i>
                            <div className="content">
                                <h4>{info.card3Title}</h4>
                                <p>
                                    Spot games that gives everyone a chance to
                                    participate in the fest.
                                </p>
                                <a
                                    href={
                                        info.card3Link || info.registrationUrl
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    click to register
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mb-4">
                        <div className="icon_box_one h-100">
                            <i className="lnr lnr-clock"></i>
                            <div className="content">
                                <h4>{info.card4Title}</h4>
                                <p>
                                    Tiqnia starts on 08 January 2026, morning
                                    9:00 am.
                                </p>
                                <a
                                    href={
                                        info.card4Link || info.registrationUrl
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    click to register
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutEvent;
