import React, { useState } from 'react'
import './App.css';
import { auth, db } from './firebase/init'
//allows us to make a document in our database
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc } from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
 } from "firebase/auth";
import Skeleton from './firebase/Skeleton';
import LoginLogoutbtn from './firebase/Loginbtn';

 function App() {
 const[loading,setLoading]=React.useState({})
 const[user,setUser]=useState(true)

async function updatePost(){
  const hardCodedId='3rM4MEv5WjvGcFLZDWQ3'
  const postRef = doc(db, "posts",hardCodedId)
  const post = await getPostsById(hardCodedId)
  //console.log(post)
  const newPost = {
    //description: "finish school this year",
    //uid: "1",
    //if you only want to update the title, use the spread operator
    //spread: copy all the fields from (post) except the title
    ...post,
    title: "school goals updated"
  }
  console.log(newPost)
  //pass in the reference of the post that we are updating
  //this makes it work
  updateDoc(postRef, newPost)
}

function deletePost(){
  const hardCodedId='3rM4MEv5WjvGcFLZDWQ3'
  const postRef = doc(db, "posts",hardCodedId)
  deleteDoc(postRef)
}

 function createPost(){
   const post = {
     title: "Finish Firebase section",
     description: "do a finish course",
     //the uid is the big string/idkey that we used in firestore
     uid: user.uid
   }
   //we have a reference to where we want to add the data
   //so also specifiy which data we wanna add (post)
   addDoc(collection(db, "posts"), post)
 }

 async function getAllPosts(){
   //collection(db,"posts") is a reference
  const {docs} = await getDocs(collection(db, "posts"))
  //map over each element in this array
  //and for each element we want to call this data function that 
  //data base gives us. this is what turns it into js
  //the spread operator ... returns a copy of the object,with an 
  //added id section in the console that wasnt there before
  const posts = docs.map(elem => ({...elem.data(), id: elem.id}))
  console.log(posts)
 }

async function getPostsById(id){
  const postRef = doc(db, "posts",id)
  //convert it to js
  const postSnap = await getDoc(postRef)
  //getting the actually data from postSnap
  return postSnap.data()
}

async function getPostByUid(){
  //get a reference to all the posts where th uid is equal to the current user thats currently logged in
  const postCollectionRef = await query(
    //specify which post we r looking at (the post collection)
    collection(db,"posts"),
    //the query. what posts in there do we actaully want to fetch
    //where the uid is equal to the user uid, therefore
    //if they are logged out, wont work. if logged in, works
    where("uid","==",user.uid)
  )

  //instead of passing in the reference: "(collection(db, "posts")"
  // we are passing in the same reference, except where the uid is 
  //equal to the user uid
  const { docs } = await getDocs(postCollectionRef)
  console.log(docs.map(doc => doc.data()))

}

React.useEffect(() => {
  //this will take time when called
  onAuthStateChanged(auth,(user) => {
    //set false when the program is ready
    setLoading(false)
    //console.log(user)
    if(user){
      setUser(user)
    }
  })
}, [])

 function register(){
   console.log('register')
   createUserWithEmailAndPassword(auth,'michael@gmail.com','password123')
    .then((user) => {
      console.log(user)
    })
    .catch((error) => {
      console.log(error)
    })
 }

  function logout(){
    signOut(auth)
    setUser({})
  }

  return (
    <div className="App">
       {loading ? (
      <>
        <Skeleton />
      </>
      ) : (
        <>
        <button onClick={register} className="nav__button">Register</button>
        <LoginLogoutbtn />
        <button onClick={logout} className="nav__button">Logout</button>
        <button onClick={createPost}>Create Post</button>
        <button onClick={getAllPosts}>Get All Posts</button>
        <button onClick={getPostsById}>Get Post by Id</button>
        <button onClick={getPostByUid}>Get Post by Uid</button>
        <button onClick={updatePost}>Update post</button>
        <button onClick={deletePost}>Delete post</button>

        </>
          )
      }
    </div>
  )
}
export default App;
