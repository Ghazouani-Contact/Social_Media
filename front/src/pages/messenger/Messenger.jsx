import { useEffect, useRef, useState } from 'react';
import { ChatOnline } from '../../components/chatonline/ChatOnline';
import { Conversation } from '../../components/conversations/Conversation';
import { Message } from '../../components/message/Message';
import Topbar from '../../components/topbar/Topbar';
import axios from 'axios';
import './messenger.css'
import { useSelector } from 'react-redux';
import { io } from "socket.io-client";

export const Messenger = () => {

const user=useSelector((state)=>state.user.currentUser);
const[conversations,setConversations]=useState([]);
const[currentChat,setCurrentChat]=useState(null);
const[messages,setMessages]=useState([]);
const[newMessage,setNewMessage]=useState("");
const scrollRef=useRef();
const [arrivalMessage, setArrivalMessage] = useState(null); //socket instant msg
const socket = useRef();  //socket instant msg
const [onlineUsers, setOnlineUsers] = useState([]);//for Online users right side

//socket instant msg
useEffect(() => {
  socket.current = io("ws://localhost:8900");
  socket.current.on("getMessage", (data) => {
    setArrivalMessage({
      sender: data.senderId,
      text: data.text,
      createdAt: Date.now(),
    });
  });
}, []);

//socket instant msg
useEffect(() => {
  arrivalMessage &&
    currentChat?.members.includes(arrivalMessage.sender) &&
    setMessages((prev) => [...prev, arrivalMessage]);
}, [arrivalMessage, currentChat]);

//socket instant msg
useEffect(() => {
  socket.current.emit("addUser", user._id);
  socket.current.on("getUsers", (users) => {

//for Online users right side
    setOnlineUsers(
      user.followings.filter((f) => users.some((u) => u.userId === f))
    );

  });
}, [user]);

useEffect(()=>{
  const FetchConversations = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/conversations/"+user._id);
      setConversations(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  FetchConversations();
},[user._id]);


useEffect(()=>{
  const getMessages = async()=>{
try {
  const res = await axios.get('http://localhost:8800/api/messages/'+currentChat?._id)
  setMessages(res.data)
} catch (error) {
  console.log(error); 
}
  }
  getMessages();
},[currentChat])


const handleSubmit=async(e)=>{
  e.preventDefault();
  const message={
    sender:user._id,
    text:newMessage,
    conversationId:currentChat._id,
  };
//socket instant msg
  const receiverId = currentChat.members.find(
    (member) => member !== user._id
  );
  socket.current.emit("sendMessage", {
    senderId: user._id,
    receiverId,
    text: newMessage,
  });

  try {
    const res =await axios.post("http://localhost:8800/api/messages",message);
    setMessages([...messages,res.data])
    setNewMessage("")
  } catch (error) {
    console.error(error);
  }
}


useEffect(() => {
  scrollRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

  return (
    <>
    <Topbar/>
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search for friends" className="chatMenuInput" />
          {conversations.map((c)=>(
            <div onClick={()=>setCurrentChat(c)}>   
             <Conversation conversation={c} currentUser={user} key={c._id}/>
           </div>

         ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
         {currentChat?
            <>
              <div className="chatBoxTop">
                {messages.map((m) =>(
                  <div ref={scrollRef} key={m._id}> 
               <Message message={m} own={m.sender === user._id} />
              </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="write something..."
                  onChange={(e)=>setNewMessage(e.target.value)}
                  value={newMessage}
                  ></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </>
            : <span className="noConversationText">
            Open a conversation to start a chat.
          </span>}
       
           
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">

        <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
        />

        </div>
      </div>
    </div>
  </>
);
}
