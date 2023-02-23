import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import './Style/News.css';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
	appId: process.env.REACT_APP_FIREBASE_APPID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export function News() {
	const [text, setText] = useState("");
	const [posts, loading, error] = useCollectionData(
		firestore.collection("posts").orderBy("createdAt", "desc")
	);

	useEffect(() => {
		firestore.collection("posts").onSnapshot(() => {
		window.scrollTo(0, document.body.scrollHeight);
		});
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		firestore.collection("posts").add({
			text,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			likes: 0,
		}).then((docRef) => {
			docRef.set({ id: docRef.id }, { merge: true });
		});
		setText("");
	};

	const handleLike = async (post) => {
		const postRef = firestore.collection("posts").doc(post.id);
		const doc = await postRef.get();
		if (doc.exists) {
			postRef.update({
				likes: post.likes + 1 
			});
		} else {
			console.log("Document does not exist!");
		}
	};
  
	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div className="body">
			<p className="welcoming">Welcome to my social media application.<br/>New Features Coming Soon!</p>
			<form onSubmit={handleSubmit}>
				<input
				className="textBox"
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Post Something!"
				/>
				<button className="submit" type="submit">Post</button>
			</form>
			{posts.map((post, index) => (
				<div key={index} className="posts">
					<p>{post.text}</p>
					<div className="likes">
						<button onClick={() => handleLike(post)} className="btn"> {post.likes} Likes</button>
					</div>
				</div>
			))}
		</div>
	);
}