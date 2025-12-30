import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    setDoc,
    getDoc,
    updateDoc,
} from "firebase/firestore";

const AdminDashboard = () => {
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState("general");
    const [loading, setLoading] = useState(false);

    // --- GENERAL INFO STATE ---
    // --- GENERAL INFO STATE ---
    const [generalInfo, setGeneralInfo] = useState({
        departmentDescription: "The Department of COMPUTER APPLICATION at...",
        registrationUrl: "https://forms.gle/t6vWyAET3kV4boHd7", // Global Default
        contactEmail: "nihal.chiyoor@gmail.com",
        aboutCards: [],

        // About Event
        aboutEventText:
            "The IT FEST of WMO IG Arts and Science College\nKappumchal Panamaram is an exciting event that\npromises to showcase the talents of the students in\nthe field of Information Technology.",

        // About Us
        aboutUsText:
            "WMOIG COLLEGE, Cherukattoor, Wayanad is committed to enrich the young generation by empowering them...",

        // Register CTA
        registerCtaText:
            "Registered to the IT FEST (TIQNIA2023) conducted by department of COMPUTER APPLICATION...",
        registerCtaButtonText: "Register Now",

        eventCount: "8",
        card1Title: "Events",
        card1Link: "https://forms.gle/t6vWyAET3kV4boHd7",
        card2Title: "Treasure Hunt",
        card2Link: "https://forms.gle/t6vWyAET3kV4boHd7",
        card3Title: "Spot Games",
        card3Link: "https://forms.gle/t6vWyAET3kV4boHd7",
        card4Title: "Time",
        card4Link: "https://forms.gle/t6vWyAET3kV4boHd7",
    });

    // --- MESSAGES STATE ---
    const [messages, setMessages] = useState([]);

    // --- EVENTS STATE ---
    const [events, setEvents] = useState([]);
    const [editingEventId, setEditingEventId] = useState(null);
    const [debugLog, setDebugLog] = useState("Debug: Ready"); // Debug logs
    const [newEvent, setNewEvent] = useState({
        name: "",
        prize: "",
        img: "",
        link: "",
    });

    // --- REFS ---
    const generalDocRef = useMemo(
        () => doc(db, "settings", "general_info"),
        []
    );

    const eventsColRef = useMemo(() => collection(db, "events"), []);
    const messagesColRef = useMemo(() => collection(db, "messages"), []);

    // --- DATA FETCHING ---
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            // General
            const genSnap = await getDoc(generalDocRef);
            if (genSnap.exists()) {
                const data = genSnap.data();
                // Migration: If aboutCards is missing, build it from legacy
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
                setGeneralInfo((prev) => ({ ...prev, ...data }));
            }

            // Events
            const eventsSnap = await getDocs(eventsColRef);
            setEvents(eventsSnap.docs.map((d) => ({ ...d.data(), id: d.id })));

            // Messages
            const msgsSnap = await getDocs(messagesColRef);
            setMessages(msgsSnap.docs.map((d) => ({ ...d.data(), id: d.id })));
        } catch (err) {
            console.error("Error fetching data:", err);
        }
        setLoading(false);
    }, [generalDocRef, eventsColRef, messagesColRef]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // --- HANDLERS: GENERAL ---
    const handleSaveGeneral = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await setDoc(generalDocRef, generalInfo);
            alert("General Info Saved!");
        } catch (err) {
            console.error(err);
            alert("Error saving general info");
        }
        setLoading(false);
    };

    // --- HANDLERS: EVENTS ---
    const handleSaveEvent = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingEventId) {
                // Update existing
                await updateDoc(doc(db, "events", editingEventId), newEvent);
            } else {
                // Add new
                await addDoc(eventsColRef, newEvent);
            }
            setNewEvent({ name: "", prize: "", img: "", link: "" });
            setEditingEventId(null);
            fetchData();
        } catch (err) {
            console.error("Error saving event:", err);
            alert("Error saving event");
        }
        setLoading(false);
    };

    const handleEditEvent = (evt) => {
        setEditingEventId(evt.id);
        setNewEvent({
            name: evt.name,
            prize: evt.prize,
            img: evt.img,
            link: evt.link || "",
        });
    };

    const handleCancelEdit = () => {
        setEditingEventId(null);
        setNewEvent({ name: "", prize: "", img: "", link: "" });
    };

    const handleDeleteEvent = async (id) => {
        setDebugLog(
            (prev) => "1. Click Delete " + id + " (Direct - No Confirm)"
        );

        // Optimistic update
        const previousEvents = [...events];
        setEvents(events.filter((e) => e.id !== id));
        setDebugLog((prev) => prev + " | 2. UI Removed");

        try {
            setDebugLog((prev) => prev + " | 3. Sending...");
            await deleteDoc(doc(db, "events", id));
            setDebugLog((prev) => prev + " | 4. SUCCESS");
        } catch (error) {
            console.error("Error deleting event:", error);
            setDebugLog((prev) => prev + " | ERROR: " + error.message);
            alert("DELETE ERROR:\n" + error.message);
            setEvents(previousEvents);
        }
    };

    // --- HANDLERS: MESSAGES ---
    const handleDeleteMessage = async (id) => {
        if (window.confirm("Delete message?")) {
            try {
                await deleteDoc(doc(db, "messages", id));
                setMessages(messages.filter((m) => m.id !== id));
            } catch (err) {
                console.error("Error deleting message:", err);
                alert("Error deleting message");
            }
        }
    };

    return (
        <section
            className="pt100 pb100 bg-light"
            style={{ minHeight: "100vh" }}
        >
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <h2 className="title text-dark">CMS Admin Dashboard</h2>
                    <button onClick={logout} className="btn btn-outline-danger">
                        Logout
                    </button>
                </div>

                <ul className="nav nav-pills mb-4 nav-justified bg-white rounded shadow-sm p-2">
                    {["general", "events", "messages"].map((tab) => (
                        <li className="nav-item" key={tab}>
                            <button
                                className={`nav-link ${
                                    activeTab === tab ? "active" : ""
                                } text-uppercase fw-bold`}
                                onClick={() => setActiveTab(tab)}
                                style={{ borderRadius: "5px" }}
                            >
                                {tab}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* CONTENT AREA */}
                <div
                    className="tab-content"
                    style={{ opacity: loading ? 0.6 : 1 }}
                >
                    {/* --- GENERAL TAB --- */}
                    {activeTab === "general" && (
                        <div className="card shadow-sm border-0">
                            <div className="card-body p-4">
                                <h4 className="mb-4">General Settings</h4>
                                <form onSubmit={handleSaveGeneral}>
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Global Registration URL
                                                    (Used in Buttons)
                                                </label>
                                                <input
                                                    type="url"
                                                    className="form-control"
                                                    value={
                                                        generalInfo.registrationUrl
                                                    }
                                                    onChange={(e) =>
                                                        setGeneralInfo({
                                                            ...generalInfo,
                                                            registrationUrl:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Contact Email (Footer)
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    value={
                                                        generalInfo.contactEmail ||
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        setGeneralInfo({
                                                            ...generalInfo,
                                                            contactEmail:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>

                                        {/* About Event Section */}
                                        <div className="col-12">
                                            <h5 className="mb-3 text-primary">
                                                About Event Section
                                            </h5>
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    About Event Text
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    rows="4"
                                                    value={
                                                        generalInfo.aboutEventText ||
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        setGeneralInfo({
                                                            ...generalInfo,
                                                            aboutEventText:
                                                                e.target.value,
                                                        })
                                                    }
                                                ></textarea>
                                            </div>
                                        </div>

                                        {/* About Us Section */}
                                        <div className="col-12">
                                            <h5 className="mb-3 text-primary">
                                                About Us Section
                                            </h5>
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    About Us Text
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    rows="4"
                                                    value={
                                                        generalInfo.aboutUsText ||
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        setGeneralInfo({
                                                            ...generalInfo,
                                                            aboutUsText:
                                                                e.target.value,
                                                        })
                                                    }
                                                ></textarea>
                                            </div>
                                        </div>

                                        {/* Register CTA Section */}
                                        <div className="col-12">
                                            <h5 className="mb-3 text-primary">
                                                Register CTA Section
                                            </h5>
                                            <div className="row g-3">
                                                <div className="col-md-8">
                                                    <label className="form-label">
                                                        CTA Text
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        rows="2"
                                                        value={
                                                            generalInfo.registerCtaText ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            setGeneralInfo({
                                                                ...generalInfo,
                                                                registerCtaText:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    ></textarea>
                                                </div>
                                                <div className="col-md-4">
                                                    <label className="form-label">
                                                        Button Text
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={
                                                            generalInfo.registerCtaButtonText ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            setGeneralInfo({
                                                                ...generalInfo,
                                                                registerCtaButtonText:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* --- Card Configuration Grid --- */}
                                        {/* --- Card Configuration Grid --- */}
                                        <div className="col-12">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h5 className="text-primary mb-0">
                                                    About Event Cards
                                                    Configuration
                                                </h5>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-success"
                                                    onClick={() => {
                                                        const newCard = {
                                                            id: Date.now(),
                                                            count: "",
                                                            title: "New Card",
                                                            description:
                                                                "Description here",
                                                            link: generalInfo.registrationUrl,
                                                            icon: "lnr lnr-star", // Default icon
                                                        };
                                                        setGeneralInfo({
                                                            ...generalInfo,
                                                            aboutCards: [
                                                                ...(generalInfo.aboutCards ||
                                                                    []),
                                                                newCard,
                                                            ],
                                                        });
                                                    }}
                                                >
                                                    + Add Card
                                                </button>
                                            </div>

                                            <div className="row g-3">
                                                {(
                                                    generalInfo.aboutCards || []
                                                ).map((card, index) => (
                                                    <div
                                                        className="col-md-6"
                                                        key={index}
                                                    >
                                                        <div className="card h-100 border-secondary">
                                                            <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                                                <span>
                                                                    Card{" "}
                                                                    {index + 1}
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-xs btn-outline-danger py-0"
                                                                    onClick={() => {
                                                                        const newCards =
                                                                            generalInfo.aboutCards.filter(
                                                                                (
                                                                                    _,
                                                                                    i
                                                                                ) =>
                                                                                    i !==
                                                                                    index
                                                                            );
                                                                        setGeneralInfo(
                                                                            {
                                                                                ...generalInfo,
                                                                                aboutCards:
                                                                                    newCards,
                                                                            }
                                                                        );
                                                                    }}
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                            <div className="card-body">
                                                                {/* Count (Optional) */}
                                                                <div className="mb-2">
                                                                    <label className="form-label small">
                                                                        Count
                                                                        (Optional)
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-sm"
                                                                        value={
                                                                            card.count ||
                                                                            ""
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            const newCards =
                                                                                [
                                                                                    ...generalInfo.aboutCards,
                                                                                ];
                                                                            newCards[
                                                                                index
                                                                            ].count =
                                                                                e.target.value;
                                                                            setGeneralInfo(
                                                                                {
                                                                                    ...generalInfo,
                                                                                    aboutCards:
                                                                                        newCards,
                                                                                }
                                                                            );
                                                                        }}
                                                                    />
                                                                </div>
                                                                {/* Title */}
                                                                <div className="mb-2">
                                                                    <label className="form-label small">
                                                                        Title
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-sm"
                                                                        value={
                                                                            card.title ||
                                                                            ""
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            const newCards =
                                                                                [
                                                                                    ...generalInfo.aboutCards,
                                                                                ];
                                                                            newCards[
                                                                                index
                                                                            ].title =
                                                                                e.target.value;
                                                                            setGeneralInfo(
                                                                                {
                                                                                    ...generalInfo,
                                                                                    aboutCards:
                                                                                        newCards,
                                                                                }
                                                                            );
                                                                        }}
                                                                    />
                                                                </div>
                                                                {/* Description */}
                                                                <div className="mb-2">
                                                                    <label className="form-label small">
                                                                        Description
                                                                    </label>
                                                                    <textarea
                                                                        className="form-control form-control-sm"
                                                                        rows="2"
                                                                        value={
                                                                            card.description ||
                                                                            ""
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            const newCards =
                                                                                [
                                                                                    ...generalInfo.aboutCards,
                                                                                ];
                                                                            newCards[
                                                                                index
                                                                            ].description =
                                                                                e.target.value;
                                                                            setGeneralInfo(
                                                                                {
                                                                                    ...generalInfo,
                                                                                    aboutCards:
                                                                                        newCards,
                                                                                }
                                                                            );
                                                                        }}
                                                                    ></textarea>
                                                                </div>
                                                                {/* Link */}
                                                                <div className="mb-2">
                                                                    <label className="form-label small">
                                                                        Link
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-sm"
                                                                        value={
                                                                            card.link ||
                                                                            ""
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            const newCards =
                                                                                [
                                                                                    ...generalInfo.aboutCards,
                                                                                ];
                                                                            newCards[
                                                                                index
                                                                            ].link =
                                                                                e.target.value;
                                                                            setGeneralInfo(
                                                                                {
                                                                                    ...generalInfo,
                                                                                    aboutCards:
                                                                                        newCards,
                                                                                }
                                                                            );
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label">
                                                Department Description
                                            </label>
                                            <textarea
                                                className="form-control"
                                                rows="4"
                                                value={
                                                    generalInfo.departmentDescription
                                                }
                                                onChange={(e) =>
                                                    setGeneralInfo({
                                                        ...generalInfo,
                                                        departmentDescription:
                                                            e.target.value,
                                                    })
                                                }
                                            ></textarea>
                                        </div>
                                        <div className="col-12 text-end">
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-lg"
                                            >
                                                Save Settings
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* --- HERO TAB --- */}

                    {/* --- EVENTS TAB --- */}
                    {activeTab === "events" && (
                        <div className="card shadow-sm border-0">
                            <div className="card-body p-4">
                                <h4 className="mb-4">Events Management</h4>

                                {/* DEBUG BOX */}
                                <div className="alert alert-dark font-monospace mb-3 p-2 small">
                                    <strong>Debugger:</strong> {debugLog}
                                </div>

                                {/* List */}
                                <div className="table-responsive mb-4">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Img</th>
                                                <th>Name</th>
                                                <th>Prizes</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {events.map((evt) => (
                                                <tr key={evt.id}>
                                                    <td>
                                                        <img
                                                            src={evt.img}
                                                            style={{
                                                                height: "40px",
                                                            }}
                                                            alt=""
                                                        />
                                                    </td>
                                                    <td>{evt.name}</td>
                                                    <td
                                                        dangerouslySetInnerHTML={{
                                                            __html: evt.prize,
                                                        }}
                                                    ></td>
                                                    <td>
                                                        <button
                                                            onClick={() =>
                                                                handleEditEvent(
                                                                    evt
                                                                )
                                                            }
                                                            className="btn btn-sm btn-info me-2 text-white"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDeleteEvent(
                                                                    evt.id
                                                                )
                                                            }
                                                            className="btn btn-sm btn-danger"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {/* Form */}
                                <hr />
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5>
                                        {editingEventId
                                            ? "Edit Event"
                                            : "Add New Event"}
                                    </h5>
                                    {editingEventId && (
                                        <button
                                            onClick={handleCancelEdit}
                                            className="btn btn-sm btn-secondary"
                                        >
                                            Cancel Editing
                                        </button>
                                    )}
                                </div>
                                <form
                                    onSubmit={handleSaveEvent}
                                    className="row g-3"
                                >
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Event Name"
                                            required
                                            value={newEvent.name}
                                            onChange={(e) =>
                                                setNewEvent({
                                                    ...newEvent,
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Image URL"
                                            required
                                            value={newEvent.img}
                                            onChange={(e) =>
                                                setNewEvent({
                                                    ...newEvent,
                                                    img: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <input
                                            type="url"
                                            className="form-control"
                                            placeholder="Registration Link (Optional)"
                                            value={newEvent.link}
                                            onChange={(e) =>
                                                setNewEvent({
                                                    ...newEvent,
                                                    link: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="col-12">
                                        <textarea
                                            className="form-control"
                                            placeholder="Prizes (HTML allowed, e.g. 1st: 1000 <br> 2nd: 500)"
                                            required
                                            value={newEvent.prize}
                                            onChange={(e) =>
                                                setNewEvent({
                                                    ...newEvent,
                                                    prize: e.target.value,
                                                })
                                            }
                                        ></textarea>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-success">
                                            {editingEventId
                                                ? "Update Event"
                                                : "Add Event"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* --- MESSAGES TAB --- */}
                    {activeTab === "messages" && (
                        <div className="card shadow-sm border-0">
                            <div className="card-body p-4">
                                <h4 className="mb-4">
                                    Inbox / Contact Requests
                                </h4>
                                {messages.length === 0 ? (
                                    <p>No messages found.</p>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Email</th>
                                                    <th>Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {messages.map((msg) => (
                                                    <tr key={msg.id}>
                                                        <td>{msg.email}</td>
                                                        <td>
                                                            {msg.date &&
                                                            msg.date.seconds
                                                                ? new Date(
                                                                      msg.date
                                                                          .seconds *
                                                                          1000
                                                                  ).toLocaleString()
                                                                : "N/A"}
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-sm btn-danger"
                                                                onClick={() =>
                                                                    handleDeleteMessage(
                                                                        msg.id
                                                                    )
                                                                }
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AdminDashboard;
