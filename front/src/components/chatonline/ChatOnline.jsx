import './chatOnline.css'
import { useEffect, useState } from "react";
import axios from 'axios'
export const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);


  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("http://localhost:8800/api/users/friends/" + currentId);
      setFriends(res.data);
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:8800/api/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

    return (
        <div className="chatOnline">
          {onlineFriends.map((o) => (
            <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
              <div className="chatOnlineImgContainer">
                <img
                  className="chatOnlineImg"
                  src={
                    o?.profilePicture
                      ? o.profilePicture
                      : "/assets/R.png"
                  }
                  
                  alt=""
                />
                <div className="chatOnlineBadge"></div>
              </div>
              <span className="chatOnlineName">{o?.username}</span>
            </div>
             ))}
        </div>
      );
}
