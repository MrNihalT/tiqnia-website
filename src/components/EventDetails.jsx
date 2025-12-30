import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const EventDetails = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "events"));
                const eventsList = querySnapshot.docs.map((doc) => doc.data());

                if (eventsList.length > 0) {
                    setEvents(eventsList);
                } else {
                    // Fallback
                    setEvents([
                        {
                            name: "IT QUIZZ",
                            prize: "1'st prize:2000 <br> 2'nd prize:1000",
                            img: "/assets/img/1caa0201e8795cf8e4ef35b36a71d2dd (1).jpg",
                        },
                        {
                            name: "Gaming competition",
                            prize: "1'st prize:1000 <br> 2'nd prize:500",
                            img: "/assets/img/WhatsApp Image 2023-02-08 at 2.5.jpg",
                        },
                        {
                            name: "Hackathon",
                            prize: "1'st prize:1000 <br> 2'nd prize:500",
                            img: "/assets/img/istockphoto-1125107251-612x612.jpg",
                        },
                        {
                            name: "Debate",
                            prize: "1'st prize:2000 <br> 2'nd prize:1000",
                            img: "/assets/img/glowing-neon-line-stage-stand-de.jpg",
                        },
                        {
                            name: "Web Designing",
                            prize: "1'st prize:1000 <br> 2'nd prize:500",
                            img: "/assets/img/1f9ca43d-6eb4-4da1-9e39-660197e8 (1).jpg",
                        },
                        {
                            name: "Basic coding",
                            prize: "1'st prize:1000 <br> 2'nd prize:500",
                            img: "/assets/img/3054cf47-af6e-4eaf-bddc-daea2f6c.jpg",
                        },
                        {
                            name: "Treasure Hunt",
                            prize: "1'st prize:5000 <br> Spot registration only(First 10 teams)",
                            img: "/assets/img/c4728530-723d-4bb6-bba0-417e8cf2.jpg",
                        },
                        {
                            name: "Spot Games",
                            prize: "Entry fee:20",
                            img: "/assets/img/3368335c-0735-40f7-9c3c-6fd4e8b0.jpg",
                        },
                    ]);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <section className="pb100">
            <div className="container" id="The-Events">
                <div className="section_title mb50">
                    <h3 className="title">The Events</h3>
                </div>
                <div className="row justify-content-center">
                    {events.map((evt, index) => (
                        <div
                            className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
                            key={index}
                        >
                            <div className="speaker_box">
                                <a
                                    href={evt.link || "#"}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        display: "block",
                                        color: "inherit",
                                    }}
                                >
                                    <div className="speaker_img">
                                        <img
                                            style={{
                                                width: "100%",
                                                height: "300px",
                                                objectFit: "fill",
                                            }}
                                            src={evt.img}
                                            alt={evt.name}
                                            onError={(e) => {
                                                e.target.src =
                                                    "https://placehold.co/400x400?text=Event";
                                            }}
                                        />
                                        <div className="info_box">
                                            <h5 className="name">{evt.name}</h5>
                                            <p
                                                className="position"
                                                dangerouslySetInnerHTML={{
                                                    __html: evt.prize,
                                                }}
                                            ></p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventDetails;
