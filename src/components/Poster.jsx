import React from "react";

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
        <section className="pt100 bg-gray">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10">
                        {posters.map((poster, index) => (
                            <div
                                key={index}
                                className="d-flex justify-content-center align-items-center w-100 mb-5"
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
                                        maxWidth: "100%",
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Poster;
