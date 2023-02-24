import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { useCollectionData } from "react-firebase-hooks/firestore";
import './Style/News.css';

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
const firestore = firebase.firestore();
const storage = firebase.storage();

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

	const handleSubmit = async (event) => {
		event.preventDefault();
		const imageFile = event.target.elements.imageFile.files[0];
		const storageRef = storage.ref().child(`images/${imageFile.name}`);
		await storageRef.put(imageFile);

		const imageUrl = await storageRef.getDownloadURL();

		firestore.collection("posts").add({
			text,
			imageUrl,
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
				<input type="file" name="imageFile" accept="image/*"/>
				<button className="submit" type="submit">Post</button>
			</form>
			{posts.map((post, index) => (
				<div key={index} className="posts">
					{post.imageUrl && (
						<img src={post.imageUrl} alt="Uploaded by user" style={{ maxWidth: "70%", maxHeight: "300px", objectFit:"contain", marginLeft:"15%" }}/>
					)}
					<p>{post.text}</p>
					<div className="likes">
						<button onClick={() => handleLike(post)} className="btn"> {post.likes} Likes</button>
					</div>
				</div>
			))}
		</div>
	);
}