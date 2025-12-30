import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Poster = () => {
    const posters = ["/assets/img/poster.jpg", "/assets/img/poster2.jpg"];

    const handleDownload = (url) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = url.split("/").pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section className="pt100 pb100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            className="rounded shadow-lg"
                        >
                            {posters.map((poster, index) => (
                                <SwiperSlide key={index}>
                                    <div
                                        onClick={() => handleDownload(poster)}
                                        style={{ cursor: "pointer" }}
                                        title="Click to download"
                                    >
                                        <img
                                            src={poster}
                                            alt={`Tiqnia Poster ${index + 1}`}
                                            className="img-fluid w-100"
                                            style={{
                                                maxHeight: "600px",
                                                objectFit: "contain",
                                                backgroundColor: "#000",
                                            }}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <p className="text-center mt-3 text-muted">
                            <small>Click on the poster to download</small>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Poster;
