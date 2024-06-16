import { Link } from "react-router-dom";
import "./closeFriends.css";

export default function CloseFriend({users}) {
  return (
    <> 
    <Link to={`/profile/${users.username}`} style={{textDecoration:"none", color:"black"}}>
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={users.profilePicture} alt="" />
      <span className="sidebarFriendName">{users.username}</span>
    </li>
    </Link>
    </>
  );
}