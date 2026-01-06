import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Partners = () => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "partners"));
                const brandsList = querySnapshot.docs.map((doc) => doc.data());

                if (brandsList.length > 0) {
                    setBrands(brandsList);
                } else {
                    // Fallback to static data if DB is empty to keep the site looking good initially
                    setBrands([
                        {
                            link: "https://www.instagram.com/vazhikatti__86/",
                            img: "/assets/img/brands/alangar.png",
                        },
                        {
                            link: "https://www.instagram.com/lyfizy_group/",
                            img: "/assets/img/brands/area51.png",
                        },
                        {
                            link: "https://www.instagram.com/le_ocio_/",
                            img: "/assets/img/brands/chirayil.jpeg",
                        },
                        {
                            link: "https://instagram.com/kattumadam_marbles?igshid=YmMyMTA2M2Y=",
                            img: "/assets/img/brands/lipzz.jpeg",
                        },
                        {
                            link: "https://www.instagram.com/bceeyeah/",
                            img: "/assets/img/WhatsApp Image 2023-02-15 at 7.42.27 AM.jpeg",
                        },
                    ]);
                }
            } catch (error) {
                console.error("Error fetching partners:", error);
                // Fallback on error too
                setBrands([
                    {
                        link: "https://www.instagram.com/vazhikatti__86/",
                        img: "/assets/img/brands/alangar.png",
                    },
                    {
                        link: "https://www.instagram.com/lyfizy_group/",
                        img: "/assets/img/brands/area51.png",
                    },
                    {
                        link: "https://www.instagram.com/le_ocio_/",
                        img: "/assets/img/brands/WhatsApp Image 2023-02-14 at 3.43.13 PM.jpeg",
                    },
                    {
                        link: "https://instagram.com/kattumadam_marbles?igshid=YmMyMTA2M2Y=",
                        img: "/assets/img/brands/WhatsApp Image 2023-02-15 at 4.20.41 PM.jpeg",
                    },
                    {
                        link: "https://www.instagram.com/tiqnia2023/",
                        img: "/assets/img/WhatsApp Image 2023-02-15 at 7.42.27 AM.jpeg",
                    },
                ]);
            }
        };

        fetchBrands();
    }, []);

    return (
        <section className="bg-gray pt100 pb100">
            <div className="container">
                <div className="section_title mb50">
                    <h3 className="title">our partners</h3>
                </div>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    slidesPerView={4}
                    loop={true}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    className="brand_carousel"
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        480: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        992: { slidesPerView: 4 },
                    }}
                >
                    {brands.map((brand, index) => (
                        <SwiperSlide
                            key={index}
                            className="brand_item text-center"
                        >
                            <a
                                href={brand.link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img src={brand.img} alt="brand" />
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Partners;
