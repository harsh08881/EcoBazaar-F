import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import useApi from "../../Hooks/useApi";
import "./LoginRegister.css";
import { checkToken } from "../../utils/auth";

const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [number, setNumber] = useState("");
    const [formError, setFormError] = useState("");

    const { callApi, loading, error } = useApi(isLogin ? "/user/login" : "/user/register");
    const navigate = useNavigate();

    useEffect(() => {
        if (checkToken()) {
            navigate("/menu");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password || (!isLogin && (!confirmPassword || !name || !dob || !number))) {
            setFormError("Please fill in all fields.");
            return;
        }

        if (!isLogin && password !== confirmPassword) {
            setFormError("Passwords do not match.");
            return;
        }

        setFormError("");

        const payload = isLogin
            ? { email, password }
            : { email, password, name, dob, number };

        const data = await callApi(payload);

        if (data) {
            console.log(`${isLogin ? "Login" : "Registration"} successful`, data);

            if (isLogin) {
                localStorage.setItem("authToken", data.token);
                navigate("/menu"); // Redirect to /menu on successful login
            } else {
                alert("Registration successful! Please log in.");
                setIsLogin(true); // Switch to login form
            }
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? "Login" : "Register"}</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                {!isLogin && (
                    <>
                        <div className="auth-input-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="auth-input"
                                placeholder="Enter your name"
                                aria-label="Name"
                            />
                        </div>
                        <div className="auth-input-group">
                            <label htmlFor="number">Phone Number:</label>
                            <input
                                type="tel"
                                id="number"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                className="auth-input"
                                placeholder="Enter your phone number"
                                aria-label="Phone Number"
                            />
                        </div>
                        <div className="auth-input-group">
                            <label htmlFor="dob">Date of Birth:</label>
                            <input
                                type="date"
                                id="dob"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                className="auth-input"
                                aria-label="Date of Birth"
                            />
                        </div>
                    </>
                )}
                <div className="auth-input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="auth-input"
                        placeholder="Enter your email"
                        aria-label="Email"
                    />
                </div>
                <div className="auth-input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="auth-input"
                        placeholder="Enter your password"
                        aria-label="Password"
                    />
                </div>
                {!isLogin && (
                    <div className="auth-input-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="auth-input"
                            placeholder="Confirm your password"
                            aria-label="Confirm Password"
                        />
                    </div>
                )}
                {formError && <p className="auth-error">{formError}</p>}
                {error && <p className="auth-error">{error}</p>}
                <button type="submit" className="auth-button" disabled={loading}>
                    {loading ? "Processing..." : isLogin ? "Login" : "Register"}
                </button>
            </form>
            <p className="auth-toggle">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <span
                    onClick={() => setIsLogin(!isLogin)}
                    className="auth-toggle-link"
                >
                    {isLogin ? "Register" : "Login"}
                </span>
            </p>
        </div>
    );
};

export default LoginRegister;
