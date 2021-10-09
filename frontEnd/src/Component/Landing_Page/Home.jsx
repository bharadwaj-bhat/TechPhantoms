import React from "react";
import "./Homepage.css";
import video from "./hero.mp4";
import { Subjectimg, twiter } from "./Localdata";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div
        style={{
          position: "relative",
          zIndex: "-1",
          width: "100%",
          height: "90%",
        }}
      >
        <video width="100%" autoplay={1} muted loop>
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <div>
        <div className="Onvideo">
          <h1>
            <strong className="heading">Advance Your Skills</strong>
            <br />
            <span>with In-Depth, Modern</span>
            <br />
            <span>Front-End Engineering</span>
            <br />
            <Link to="/signup">
              <button className="button">Join Now</button>
            </Link>
          </h1>
        </div>
      </div>
      <div>
        <svg
          style={{
            height: "70",
            width: "100%",
            zIndex: "5",
            marginBottom: "6px",
          }}
        >
          <polygon
            points="0,60 0,30 1700,60"
            style={{ fill: "#0a0a0a", stroke: "none", strokeWidth: "1" }}
          />
        </svg>
      </div>

      <div className="Subject-flex">
        <div className="Subject">
          {Subjectimg.map((el) => (
            <div key={el.id}>
              <img id="Subimage" src={el.image} alt="logo" />
            </div>
          ))}
        </div>
      </div>

      <div className="MainImageBox">
        <h1>
          Join thousands of professionals who already use XYZ to ace their
          interviews
        </h1>

        <div className="ImageBox">
          {twiter.map((item) => (
            <div key={item.id} className="Combody">
              <div className="Imagebody">
                <img src={item.img} alt="" />
                <h3 className="C-head">{item.name}</h3>
              </div>
              <div className="C-des">{item.des}</div>
            </div>
          ))}
        </div>
      </div>

      {/* third */}
      <div className="Middiv">
        <div className="dots">
          <div className="onmiddiv">
            <h1>How Practicing Works</h1>
            <div className="MidData">
              <div>
                <h1>1</h1>
                <h3>Get Paired</h3>
                <p>
                  Tell us when and what you want to practice and we’ll pair you
                  with an optimal peer. We provide interview questions and a
                  collaborative environment for you to conduct the interview.
                </p>
              </div>
              <div>
                <h1>2</h1>
                <h3>Practice</h3>
                <p>
                  Sessions are conducted using a collaborative environment over
                  video. You and your peer can talk each other for 30-45
                  minutes. After the session, you’ll each provide feedback on to
                  help each other improve.
                </p>
              </div>
              <div>
                <h1>3</h1>
                <h3>Ace It</h3>
                <p>
                  Sessions are conducted using a collaborative environment over
                  video. You and your peer can talk each other for 30-45
                  minutes. After the session, you’ll each provide feedback on to
                  help each other improve.
                </p>
              </div>
            </div>

            <div className="MidButton">
              <Link className="linkss" to="/signup">
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* fourth */}
      <div className="fourthdiv">
        <h2>Stop preparing alone</h2>
        <h1>
          <span>Get Real</span> <span>Interview Practice</span>
        </h1>
        <p>
          Acing job interviews requires many skills: problem-solving,
          communication, product sensibility, and strong technical aptitude.
          There's one certain way to get dramatically better: Practicing Live
          Interviews.
        </p>
        <img src="https://www.pramp.com/img/prampSession.png" alt="img" />
        <p>
          We've built Platform to provide the complete tech practice you need,
          for free. Based on your interviewing skills, learn from your peers,
          and become comfortable performing under pressure within an interview
          setting.
        </p>
      </div>
    </div>
  );
}

export default Home;
