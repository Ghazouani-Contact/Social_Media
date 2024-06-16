import "./post.css";
import { Icon } from '@iconify/react';
import { useEffect, useState } from "react";
import axios from "axios";
import TimeAgo from 'react-timeago';
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";
export default function Post({ post }) {
  const [user,setUser]=useState({});
  const users = useSelector((state)=>state.user.currentUser)

 const [like, setLike]=useState(post.likes.length)
 const [isLiked, setIsLiked]=useState(false)

 useEffect(() => {
  setIsLiked(post.likes.includes(users._id));
}, [users._id, post.likes]);

const likeHandler = () => {
  try {
    axios.put("http://localhost:8800/api/posts/" + post._id + "/like", { userId: users._id });
  } catch (err) {}
  setLike(isLiked ? like - 1 : like + 1);
  setIsLiked(!isLiked);
};
 //FetchUser according this post
 useEffect(()=>{
   const FetchUser=async()=>{
     const res= await axios.get(`http://localhost:8800/api/users?userId=${post.userId}`);
   setUser(res.data)
   };
    FetchUser();
 },[post.userId])
 const PF="http://localhost:8800/images/"
  return ( 
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
            <img
             className="postProfileImg"
             src= {user.profilePicture ?user.profilePicture: "/assets/R.png"}
             alt=""
            />
            </Link>
            <span className="postUsername">
           {user.username}        
          </span>
          <TimeAgo className="postDate" date={post.createdAt} />
           
          </div>
          <div className="postTopRight">
          <Icon icon="ri:more-2-fill" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src= {PF+post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={"/assets/like.png"} onClick={likeHandler}  alt="" />
            <img className="likeIcon" src="/assets/heart.png" onClick={likeHandler}  alt="" />
            <span className="postLikeCounter">{like} people  like it </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments </span>
          </div>
        </div>
      </div>
    </div>
  );
}