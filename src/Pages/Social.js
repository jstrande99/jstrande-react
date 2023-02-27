import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import './Style/Social.css';
import Floating from '../Pages/images/floatin1.png';
import Login from "./Login";

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
const auth = firebase.auth(firebase.initializeApp(firebaseConfig));

export function Social() {
	const [text, setText] = useState("");
	const [posts, loading, error] = useCollectionData(
		firestore.collection("posts").orderBy("createdAt", "desc")
	);
	const [imageFile, setImageFile] = useState(null);
	// const [clientData, setClientData] = useState("");
	const [user, setUser] = useState(null);
	let activeUser = "";
	if(firebase.auth().currentUser?.displayName){
		activeUser = firebase.auth().currentUser?.displayName;
	}
	useEffect(() => {
		firestore.collection("posts.text").onSnapshot(() => {
		window.scrollTo(0, 0); //document.body.scrollHeight
		});
		// const fetchIpAddress = async () => {
		// 	const response = await fetch('https://freeipapi.com/api/json');
		// 	const data = await response.json();
		// 	setClientData(data);
		//   };
		// fetchIpAddress();
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setUser(user);
		  });
		  return unsubscribe;
	}, []);
	
	const handleLogout = async () => {
		try {
		  await auth.signOut();
		} catch (error) {
		  console.log(error);
		}
	};
	
	  if (!user) {
		return <Login />;
	  }

	const handleSubmit = async (event) => {
		event.preventDefault();
		let imageUrl = null; 
		if(imageFile){
			const imageFile = event.target.elements.imageFile.files[0];
			const storageRef = storage.ref().child(`images/${imageFile.name}`);
			await storageRef.put(imageFile);

			imageUrl = await storageRef.getDownloadURL();
		}

		firestore.collection("posts").add({
			text,
			imageUrl,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			likes: 0,
			creator: activeUser,
		}).then((docRef) => {
			docRef.set({ id: docRef.id }, { merge: true });
		});
		setText("");
		setImageFile(null);
	};

	const handleLike = async (post) => {
		const postRef = firestore.collection("posts").doc(post.id);
		const doc = await postRef.get();
		if (doc.exists) {
			if(post.clientLike && post.clientLike.includes(activeUser)){
				return;
			}
			if(post.clientLike &&  post.creator === activeUser){
				return;
			}
			postRef.update({
				likes: post.likes + 1,
				clientLike: firebase.firestore.FieldValue.arrayUnion(activeUser) 
			});
		} else {
			console.log("Document does not exist!");
		}
	};
  
	if (loading) {
		return (
			<div className={`fullscreen-${loading}`}>
				<div className='innerSpin'>
					<img src={Floating} alt='Astronat' className='loadImg'/>
				</div>
			</div>
		)
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}
	return (
		<div className="body">
			<button className="submit" onClick={() => handleLogout()}>Logout</button>
			<p className="welcoming">Welcome {activeUser},<br/> this is my social media application.<br/>New Features Coming Soon!</p>
			<form onSubmit={handleSubmit}>
				<input
				className="textBox"
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Post Something!"
				/>
				<input type="file" name="imageFile" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
				<button className="submit" type="submit">Post</button>
			</form>
			{posts.map((post, index) => (
				<div key={index} className="posts postText" data-date={post.createdAt ? post.createdAt.toDate().toLocaleDateString() : ''}>
					<p className="creator">{post.creator}</p>
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