import React from "react";

const InfoSection = () => {
    return (
        <section className="pt100 pb100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-6 col-md-3">
                        <div className="icon_box_two">
                            <i className="ion-ios-calendar-outline"></i>
                            <div className="content">
                                <h5 className="box_title">DATE</h5>
                                <p>08 January 2026</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="icon_box_two">
                            <i className="ion-ios-location-outline"></i>
                            <div className="content">
                                <h5 className="box_title">location</h5>
                                <p>
                                    <a
                                        href="https://www.google.com/maps/place/WMO+IMAM+GAZZALI+ARTS+%26+SCIENCE+COLLEGE/@11.7718843,76.0459785,187m/data=!3m1!1e3!4m7!3m6!1s0x3ba5de5313fa125d:0xeae9b896fddae1ec!8m2!3d11.7718699!4d76.046764!15sCh93bW8gaWcgYXJ0cyBhbmQgc2NpZW5jZSBjb2xsZWdlkgEHY29sbGVnZeABAA!16s%2Fg%2F11rhnytt9m?coh=164777&entry=tt"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Kappumchal, Wayanad.
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="icon_box_two">
                            <i className="fa fa-globe"></i>
                            <div className="content">
                                <h5 className="box_title">venue</h5>
                                <p>WMOIGASC</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="icon_box_two">
                            <i className="ion-email-unread"></i>
                            <div className="content">
                                <h5 className="box_title">mail</h5>
                                <p>
                                    <a className="abuttu" href="mailto:nihal.chiyoor@gmail.com">
                                        nihal.chiyoor@gmail.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InfoSection;
