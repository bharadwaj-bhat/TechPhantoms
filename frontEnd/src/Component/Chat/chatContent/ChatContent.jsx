import { useEffect, useRef , useState} from "react"
import Pusher from 'pusher-js';
import {ProfileDp} from './ProfileDp.jsx'
import "./chatContent.css";
import { ChatItem } from "./ChatItem.js";
import axios from 'axios';
import { useSelector, shallowEqual, useDispatch } from "react-redux";

  // const [message'esEndRef] = useRef(null);
 
export const ChatContent = (props)=> {

  

 
  
  const [chat, setChat] =  useState([]);
  const [message , setMessage] = useState("");
  const [userName , setUserName] = useState("");
  const [time , setTime] = useState("");

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {

    setTimeout(()=> {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    },1)
   
  }
 

  const handleTime = ()=> {
    const date = new Date();
    const hrs = date.getHours();
    const mins = date.getMinutes();
  
    
    if(hrs<12){
      return (hrs + "." + mins + "AM")

    }

    return (Math.floor(hrs%12) + "." + mins+ "PM"  )
  }
  const Time = handleTime();
  const playLoad = {
        message,
        userName,
        Time,

  }

  

  

  const handleSubmit =async ()=> {
      
    //  console.log(playLoad)
     scrollToBottom();
     setMessage("")
    axios.post("http://localhost:4500/chat", {
      message : JSON.stringify(playLoad)
    }).then((res)=> res)
    
  }
  


  const pusher = new Pusher('bb620f86342dcb7e4205', {
    cluster: 'ap2',
 
  });
 
    
    useEffect(()=>{

    //  const name = prompt("enter the name");

    //  setUserName((e)=> {
    //    return (e = name)
    //  })
   
    



      let mounted = true;
      
      if(mounted){

        var channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function(data) {
         const D = JSON.parse(data.message)
          // console.log(D)
          
           
         
          setChat((prev)=> {
       return  prev = [...prev, D]
        
          });
         
        });
      
    }

      return (()=>{ 
        pusher.unsubscribe("my-channel")
        mounted = false
        }
        )
    }, [])

   





// console.log(chat)




  

  return (
    <>
      <div className="main__chatcontent">
        <div className="content__header">

          {/* it has the block detils with image and user name  */}
           <div className="blocks">
              <div className="current-chatting-user">
                  {/* <ProfileDp    // isOnline="active"
                image="https://avatarairlines.com/wp-content/uploads/2020/05/Male-placeholder.jpeg"
                /> */}

                <h3 style = {{margin: 0}}>Chat room</h3>
                <p style = {{margin: 0}}>user: - {userName}</p>
                
              </div>
              

            </div>
           
          
          </div>
        
          <div className="content__body">
          <div className="chat__items">
            {chat.map((e, i) => {
              let them = "chat__item other";

              if(e.userName == userName){
                them = "chat__item me"
              }
                return (
                  <ChatItem msg = {e.message} time = {e.Time}

                  theme  = {them}
                  user = {e.userName}
                  />
                )

            })}
            </div>
            <div ref={messagesEndRef} />

            </div>

            <div className="content__footer">
            <div className="sendNewMessage">

              <input type = "text"
              placeholder = "type a messagee here"
              onChange = {(e)=> setMessage(e.target.value)}
              value = {message}/>
               <button className="btnSendMsg" id="sendMsgBtn">
               <img src="https://img.icons8.com/office/30/000000/paper-plane.png"
                alt = "paperPlan"
                style = {{display:"block", margin: "auto" , width: "70%"}} 
                onClick = {handleSubmit}
               />
            </button>

              </div>


              </div>


      </div>

    </>
  )
}