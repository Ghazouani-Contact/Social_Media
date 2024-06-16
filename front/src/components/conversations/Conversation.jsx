import { useEffect, useState } from 'react';
import './conversations.css'
import axios from 'axios';

export const Conversation = ({currentUser , conversation}) => {

const[user,setUser]=useState(null);

useEffect(()=>{
  const friendId = conversation.members.find((m) => m !== currentUser._id);
  const getUsers = async () =>{
  try {
    const res = await axios.get("http://localhost:8800/api/users?userId="+friendId);
    setUser(res.data)
  } catch (error) {
    console.log(error)
  }
};
getUsers() 
},[currentUser , conversation])

    return (
        <div className="conversation">
          <img
            className="conversationImg"
            src={ user?.profilePicture ? user?.profilePicture :"/assets/R.png"}
            alt=""
          />
          <span className="conversationName">{user?.username}</span>
        </div>
      );
}
