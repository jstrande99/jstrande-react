import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "./Style/Login.css";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: "socialmediatest-b40f5.firebaseapp.com",
	databaseURL: "https://socialmediatest-b40f5-default-rtdb.firebaseio.com",
	projectId: "socialmediatest-b40f5",
	storageBucket: "socialmediatest-b40f5.appspot.com",
	messagingSenderId: "1076319129324",
	appId: "1:1076319129324:web:eac004f961259c9fe85fc9",
	measurementId: "G-VB3BG79C9K"
};

firebase.initializeApp(firebaseConfig);
const userFirestore = firebase.firestore();

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [errorLog, setErrorLog] = useState("");
    const [userName, setUserName] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleToggleSignUp = () => {
        setIsSignUp(!isSignUp);
    };

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    }

    const handleResetPassword = async () =>{
		try {
            await firebase.auth().sendPasswordResetEmail(email);
            alert(`Password reset email sent to ${email}`);
        } catch (error) {
            console.log(error);
        }
	}

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isSignUp) {
            try {
                if (password !== confirmPassword) {
                    throw new Error("Passwords do not match.");
                }
                const userRef = userFirestore.collection("users").doc(userName);
                const userDoc = await userRef.get();
                if (userDoc.exists) {
                    throw new Error("Username already taken.");
                }
                await firebase.auth().createUserWithEmailAndPassword(email, password);
                const currentUser = firebase.auth().currentUser;
                await currentUser.updateProfile({
                    displayName: userName
                });
                userFirestore.collection("users").doc(userName).set({
                    email: email,
                    userName: userName,
                });
            } catch (error) {
                console.log("Error Code: " + error);
                setErrorLog(error.message);
            }
        } else {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password);
            } catch (error) {
                console.log("Error Code: " + error);
                setErrorLog("User not found. Please sign up");
            }
        }
    };

    return (
        <div className="login body">
            <h2 className="loginTTL">{isSignUp ? "Sign Up" : "Login"}</h2>
            <form onSubmit={handleSubmit} className="inputs">
                <div className="form-group">
                    <label htmlFor="email" className="emailPad">
                        Email: 
                    </label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        aria-describedby="emailHelp" 
                        value={email} onChange={handleEmailChange} 
                        placeholder="Enter Email" 
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">
                        Password: 
                    </label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        value={password} 
                        onChange={handlePasswordChange} 
                        placeholder="Enter Password" 
                        required
                    />
                </div>
                {isSignUp && (
                    <>
                        <div className="form-group">
                            <label htmlFor="confirm-password" className="confirmPass">
                                Confirm: 
                            </label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="confirm-password" 
                                value={confirmPassword} 
                                onChange={handleConfirmPasswordChange} 
                                placeholder="Confirm Password" 
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">
                                Username:
                            </label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="username" 
                                value={userName} 
                                onChange={handleUserNameChange} 
                                placeholder="Enter Username" 
                                required
                            />
                        </div>
                    </>
                )}
                <p className="errors">{errorLog}</p>
                <button type="submit" className="btn">
                    {isSignUp ? 
                        "Sign Up" : 
                        "Login"
                    }
                </button>
                <button className="btn" onClick={handleToggleSignUp}>
                    {isSignUp ? 
                        "Login" : 
                        "Sign Up"
                    } 
                </button>
                <button className="btn" onClick={handleResetPassword}>
                    Forgot Password 
                </button>
            </form>
        </div>
    );
};
