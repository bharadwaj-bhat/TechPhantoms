import "./chatContent.css";
import { ProfileDp } from "./ProfileDp";



export const ChatItem = (props)=> {
    
  
 

  return (
    <>
    <div  style={{ animationDelay: `0.8s` }}
    //check for this for defferent users 
        className={props.theme} > 

      <div className="chat__item__content">

      <div className="chat__msg"> {props.msg} </div>

           <div className="chat__meta">
              <span>{props.user}</span>
               <span> sent at {props.time}</span>

            </div>
        
      </div>

        <ProfileDp />



    </div>
    


    </>
  )

}