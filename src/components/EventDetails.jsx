import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const EventDetails = () => {
    const [events, setEvents] = useState([]);

    const posters = [
        "/assets/img/eventposter/WhatsApp Image 2026-01-06 at 10.39.24 PM (1).jpeg",
        "/assets/img/eventposter/WhatsApp Image 2026-01-06 at 10.39.24 PM.jpeg",
        "/assets/img/eventposter/WhatsApp Image 2026-01-06 at 10.39.25 PM (1).jpeg",
        "/assets/img/eventposter/WhatsApp Image 2026-01-06 at 10.39.25 PM.jpeg",
    ];

    const handleDownload = (url) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = url.split("/").pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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
                            prize: "1'st prize:2000",
                            img: "/assets/img/quiz.jpg",
                        },
                        {
                            name: "Gaming competition",
                            prize: "1'st prize:3000",
                            img: "/assets/img/WhatsApp Image 2023-02-08 at 2.5.jpg",
                        },
                        {
                            name: "Poster Designing",
                            prize: "1'st prize:1000",
                            img: "/assets/img/2.png",
                        },
                        {
                            name: "Chess Tournament ",
                            prize: "1'st prize:3000",
                            img: "/assets/img/1.png",
                        },
                        {
                            name: "Face Painting",
                            prize: "1'st prize:2000",
                            img: "/assets/img/facepainting.png",
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

                {/* Auto-sliding Event Posters Carousel */}

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
                <div className="row justify-content-center mb-5">
                    <div className="col-12 col-md-10">
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            className="mySwiper"
                        >
                            {posters.map((poster, index) => (
                                <SwiperSlide key={index}>
                                    <div
                                        className="d-flex justify-content-center align-items-center w-100"
                                        onClick={() => handleDownload(poster)}
                                        style={{
                                            cursor: "pointer",
                                        }}
                                        title="Click to download"
                                    >
                                        <img
                                            src={poster}
                                            alt={`Tiqnia Poster ${index + 1}`}
                                            className="img-fluid rounded shadow-sm"
                                            style={{
                                                width: "auto",
                                                height: "auto",
                                                maxHeight: "80vh",
                                                maxWidth: "100%",
                                                objectFit: "contain",
                                            }}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventDetails;
