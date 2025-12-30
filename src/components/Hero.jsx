import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Hero = () => {
    const slides = [
        {
            title: "COMPUTER APPLICATION DEPARTMENT PRESENTS",
            subtitle: "TIQNIA 2026",
            date: "Wmo ig arts & science college",
            bg: "/assets/img/bg/slider.png",
        },
        {
            title: "INTER COLLEGIATE IG FEST",
            subtitle: "IG FEST 2026",
            date: "08 January 2026",
            bg: "/assets/img/bg/slider.png",
        },
        {
            title: "WMO IG ARTS & SCIENCE COLLEGE",
            subtitle: "IG FEST 2026",
            date: "Kappumchal panamaram",
            bg: "/assets/img/bg/slider.png",
        },
    ];

    return (
        <section id="home" className="home-cover">
            <Swiper
                modules={[Pagination, Autoplay, EffectFade]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                effect="fade"
                loop={true}
                className="cover_slider"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide
                        key={index}
                        className="cover_item"
                        style={{ backgroundImage: `url('${slide.bg}')` }}
                    >
                        <div className="slider_content">
                            <div className="slider-content-inner">
                                <div className="container">
                                    <div className="slider-content-center">
                                        <h1
                                            className="cover-title"
                                            dangerouslySetInnerHTML={{
                                                __html: slide.title,
                                            }}
                                        ></h1>
                                        <h2 className="cover-xl-text">
                                            {slide.subtitle}
                                        </h2>
                                        <p className="cover-date">
                                            {slide.date}
                                        </p>
                                        <a
                                            href="https://docs.google.com/forms/d/e/1FAIpQLSdq6vwMMFyfPaXFA-j_gz50heXiX0pvhf7XU4eJaG7mjvsMjQ/viewform"
                                            className=" btn btn-primary btn-rounded"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Give suggestions
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Hero;
