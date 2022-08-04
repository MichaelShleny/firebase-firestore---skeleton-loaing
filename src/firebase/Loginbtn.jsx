import React, { useState } from 'react';
import {signInWithEmailAndPassword,signOut} from "firebase/auth";
import '../App.css';
import { auth } from './init';


function login(){

    signInWithEmailAndPassword(auth,'michael@gmail.com','password123')
    .then((user) => {
      console.log({ user } )
    })
    .catch((error) => {
      console.log(error)
    })
  }

const Loginbtn = () => {

    return (
        <div>
             <button onClick={login} className="nav__button otherlogin">Login</button>
        </div>
    );
}

export default Loginbtn;
