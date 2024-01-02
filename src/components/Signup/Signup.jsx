import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
    const navigate = useNavigate();

    const [user, setUser] = useState({ username: "", password: "" });
    const [error, setError] = useState(null);

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("http://localhost:3001/signup", { ...user }, { withCredentials: true });
            console.log(data);

            if (data.signup) {
                navigate("/login");
            }
        } catch (error) {
            setError("An error occurred during registration.");
            console.error("Registration error:", error);
        }
    };

    return (
        <div className="OuterSingup">
            <form className="formSinup pt-3 pe-3 ps-3" style={{ border: "1px solid grey", borderRadius: "10px" }}>
                <div className="text-center">
                    <h3>USER</h3>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example1">
                        Username
                    </label>
                    <input
                        type="text"
                        id="form2Example1"
                        className="form-control"
                        name="username"
                        onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                    />
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="form2Example2"
                        className="form-control"
                        name="password"
                        onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                    />
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="text-center">
                    <button type="button" className="btn btn-primary btn-block mb-4" onClick={handleSignup}>
                        Sign Up
                    </button>
                </div>

                <div className="text-center">
                    <p>
                        Already have an account? <a href="/login">Sign in</a>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Signup;
