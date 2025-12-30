import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Department = () => {
    const [desc, setDesc] =
        useState(`The Department of COMPUTER APPLICATION at WMO IG
                                Arts and Science College Kappumchal Wayanad is
                                dedicated to providing its students with a
                                comprehensive education in computer applications
                                and information technology. With a focus on
                                hands-on learning, the department strives to
                                equip students with the technical skills and
                                knowledge necessary to succeed in the rapidly
                                evolving world of technology.`);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const docSnap = await getDoc(
                    doc(db, "settings", "general_info")
                );
                if (docSnap.exists() && docSnap.data().departmentDescription) {
                    setDesc(docSnap.data().departmentDescription);
                }
            } catch (error) {
                console.error("Error fetching dept info:", error);
            }
        };
        fetchInfo();
    }, []);

    return (
        <section className="pb100">
            <div className="container">
                <div className="bca" id="BCA">
                    <h3>DEPARTMENT OF COMPUTER APPLICATIONS</h3>
                    <img src="/assets/img/bcadep.jpg" alt="BCA" />
                    <div className="about_bca">
                        <p>
                            <b style={{ whiteSpace: "pre-line" }}>{desc}</b>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Department;
