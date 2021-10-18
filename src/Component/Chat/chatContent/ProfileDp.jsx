import React from "react";

export const ProfileDp = (props)=>{
  

    return (
      <div className="avatar">
        <div className="avatar-img">
          <img src="https://avatarairlines.com/wp-content/uploads/2020/05/Male-placeholder.jpeg" alt="#" />
        </div>
        <span className={`isOnline ${props.isOnline}`}></span>
      </div>
    );
  
}
