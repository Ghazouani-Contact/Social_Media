import { Link } from "react-router-dom";
import "./topbar.css";
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "../../redux/userRedux";

export default function Topbar() {
  
  const user = useSelector((state)=>state.user.currentUser)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout()) 
    localStorage.clear()
    window.location.href = '/'
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to = '/' style={{ textDecoration: "none" }}>
        <span className="logo">Developers</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
        <Icon icon="system-uicons:search" className="searchIcon"/>
         
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{ textDecoration: "none" ,color:'white' }}>
          <span className="topbarLink">Home</span>
          </Link>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
          <Icon icon="healthicons:person-outline" />
            <span className="topbarIconBadge">1</span>
          </div>
         
          <div className="topbarIconItem">
          <Link to = '/messenger' style={{ textDecoration: "none" }}>
          <Icon icon="et:chat" />
            <span className="topbarIconBadge">2</span>
            </Link>

          </div>
          <div className="topbarIconItem">
          <Icon icon="material-symbols:notifications-outline" />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>

        <div className="profileDropdown">
          <img
            src={user.profilePicture ? user.profilePicture : "/assets/R.png"}
            alt=""
            className="topbarImg"
            onClick={handleProfileClick}
          />
          {isDropdownOpen && (
            <div className="profileDropdownContent">
              <Link
                to={`/profile/${user.username}`}
                style={{ textDecoration: "none" }}
              >
                Go to Profile
              </Link>
              {user ? (
                <span onClick={() => handleLogout()}>Logout</span>
              ) : ( null
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}