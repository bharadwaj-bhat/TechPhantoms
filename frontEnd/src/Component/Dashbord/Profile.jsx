import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./profile.css";

export const Profile = () => {
  const [userData, setUserData] = useState();

  const history = useHistory();
  const callProfilePage = async () => {
    try {
      const res = await fetch("/profile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setUserData(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err, "error");
      history.push("/login");
    }
  };
  useEffect(() => {
    callProfilePage();
  }, []);

  return (
    <div className="container">
      <div className="user">
        <div className="name">
          <div>
            {" "}
            <img
              src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png"
              alt="loading"
              height="50px"
            />
          </div>
          <div>
            <h2>Noor</h2>
            <p>noormuhammed</p>
          </div>
        </div>
        <div className="details">
          <div>
            <p>Timeline</p>
            <p>Comments</p>
            <p>Photo</p>
            <p>Videos</p>
            <p>Like</p>
          </div>
          <div className="btn">
            <button>Edit Profile</button>
          </div>
        </div>
      </div>

      <div className="second">
        <div className="left">
          <div className="follower">
            <div className="following">
              <p>0</p>
              <p>4</p>
              <p>5</p>
            </div>
            <div className="following2">
              <p>Gab</p>
              <p>follower</p>
              <p>follwing</p>
            </div>
          </div>
          <div className="follower">
            <div className="following">
              <h2>About</h2>
            </div>
            <div className="following2">
              <p>Member since September 2021</p>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="post">
            <div className="name2">
              <div>
                {" "}
                <img
                  src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png"
                  alt="loading"
                  height="50px"
                />
              </div>
              <div style={{ display: "flex" }}>
                <h2>Noor</h2>
                <p>@noormuhammed</p>
              </div>
            </div>

            <img
              src="https://image.shutterstock.com/image-photo/hacker-virus-malware-attack-during-260nw-1704713953.jpg"
              alt="loading"
            />

            <div className="like">
              <button>
                <i class="far fa-thumbs-up"></i>like
              </button>
              <button>
                <i class="far fa-comment-alt"></i>Comments
              </button>
              <button>
                <i class="fas fa-redo"></i>Repost
              </button>
              <button>
                <i class="far fa-share-square"></i>share
              </button>
              <button>
                <i class="fas fa-quote-right"></i>Qutos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
