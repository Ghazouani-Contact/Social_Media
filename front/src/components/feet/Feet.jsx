import { useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import './feet.css'
import axios from 'axios';
import { useSelector } from 'react-redux';


export const Feet = ({username}) => {

  const user = useSelector((state)=>state.user.currentUser)

  const [posts,setPost]=useState([]);
  useEffect(()=>{
    const FetchPosts=async()=>{
      const res= username 
      ? await axios.get('http://localhost:8800/api/posts/profile/' + username)
      :await axios.get('http://localhost:8800/api/posts/timeline/'+ user._id);
  
setPost(res.data.sort((p1, p2) => {
  return new Date(p2.createdAt) - new Date(p1.createdAt);
})
);
    };
    FetchPosts();
  },[username,user._id])
  return (
    <div className='feed'> 
     <div className="feedWrapper">
     {(!username || username === user.username) && <Share />}    {posts.map((p) =>(
     <Post key={p._id} post={p}/>
    ))}
   
   </div>
    </div>
  )
}

