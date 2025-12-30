import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await login(email, password);
            navigate("/admin");
        } catch (err) {
            console.error(err);
            setError("Failed to log in. Please check your credentials.");
        }
        setLoading(false);
    };

    return (
        <section className="pt100 pb100 bg-gray">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-5">
                        <div
                            className="card shadow-sm border-0"
                            style={{ borderRadius: "15px", overflow: "hidden" }}
                        >
                            <div className="card-body p-5">
                                <div className="text-center mb-4">
                                    <h3 className="title">Admin Login</h3>
                                </div>
                                {error && (
                                    <div className="alert alert-danger">
                                        {error}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            required
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            style={{ height: "50px" }}
                                        />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            required
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            style={{ height: "50px" }}
                                        />
                                    </div>
                                    <div className="d-grid">
                                        <button
                                            disabled={loading}
                                            className="btn btn-primary btn-block"
                                            type="submit"
                                            style={{
                                                backgroundColor: "#FE0000",
                                                borderColor: "#FE0000",
                                                height: "50px",
                                                fontSize: "16px",
                                                fontWeight: "600",
                                            }}
                                        >
                                            {loading
                                                ? "Logging In..."
                                                : "Login"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
