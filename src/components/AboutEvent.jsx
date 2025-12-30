import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const AboutEvent = () => {
    const [info, setInfo] = useState({
        aboutEventText: "Loading event details...",
        registrationUrl: "https://forms.gle/t6vWyAET3kV4boHd7",
        aboutCards: [],
    });

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const docSnap = await getDoc(
                    doc(db, "settings", "general_info")
                );
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    // Migration fallback logic for legacy data
                    if (!data.aboutCards || data.aboutCards.length === 0) {
                        data.aboutCards = [
                            {
                                id: 1,
                                count: data.eventCount || "8",
                                title: data.card1Title || "Events",
                                link: data.card1Link || data.registrationUrl,
                                description:
                                    "There will be " +
                                    (data.eventCount || "8") +
                                    " interesting events with attractive cash prizes.",
                                icon: "ion-ios-calendar-outline",
                            },
                            {
                                id: 2,
                                title: data.card2Title || "Treasure Hunt",
                                link: data.card2Link || data.registrationUrl,
                                description:
                                    "Treasure hunt -only first 10 teams of maximum of 3 persons in a team.",
                                icon: "ion-ios-search",
                            },
                            {
                                id: 3,
                                title: data.card3Title || "Spot Games",
                                link: data.card3Link || data.registrationUrl,
                                description:
                                    "Spot games that gives everyone a chance to participate in the fest.",
                                icon: "lnr lnr-rocket",
                            },
                            {
                                id: 4,
                                title: data.card4Title || "Time",
                                link: data.card4Link || data.registrationUrl,
                                description:
                                    "Tiqnia starts on 08 January 2026, morning 9:00 am.",
                                icon: "lnr lnr-clock",
                            },
                        ];
                    }
                    setInfo((prev) => ({ ...prev, ...data }));
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
                    {(info.aboutCards || []).map((card, index) => (
                        <div
                            className="col-12 col-md-6 col-lg-3 mb-4"
                            key={index}
                        >
                            <div className="icon_box_one h-100">
                                {card.img ? (
                                    <img
                                        src={card.img}
                                        alt={card.title}
                                        style={{
                                            height: "50px",
                                            marginBottom: "20px",
                                            objectFit: "contain",
                                        }}
                                    />
                                ) : (
                                    <i
                                        className={
                                            card.icon || "ion-ios-star-outline"
                                        }
                                    ></i>
                                )}
                                <div className="content">
                                    <h4>
                                        {card.count ? `${card.count} ` : ""}
                                        {card.title}
                                    </h4>
                                    <p>{card.description}</p>
                                    <a
                                        href={card.link || info.registrationUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        click to register
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutEvent;
