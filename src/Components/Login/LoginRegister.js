import React, { useState } from "react";
import useApi from "../../Hooks/useApi";
import "./LoginRegister.css";

const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formError, setFormError] = useState("");

    // Use the custom hook
    const { callApi, loading, error } = useApi(isLogin ? "/user/login" : "/user/register");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password || (!isLogin && !confirmPassword)) {
            setFormError("Please fill in all fields.");
            return;
        }

        if (!isLogin && password !== confirmPassword) {
            setFormError("Passwords do not match.");
            return;
        }

        setFormError("");

        const payload = { email, password };

        const data = await callApi(payload);

        if (data) {
            console.log(`${isLogin ? "Login" : "Registration"} successful`, data);
            alert(`${isLogin ? "Login" : "Registration"} successful!`);
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? "Login" : "Register"}</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-input-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="auth-input"
                        placeholder="Enter your email"
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
