import React from "react";
import "../index.css";

const Home = () => {
  return (
    <div style={{ overflow: "auto", height: "100vh" }}>
      {
        <div className="title-container">
          <div className="overlay"></div>
          <div className="text">
            <div className="wrapper">
              <div id="L" className="letter">
                L
              </div>
              <div className="shadow">L</div>
            </div>
            <div className="wrapper">
              <div id="O" className="letter">
                O
              </div>
              <div className="shadow">O</div>
            </div>
            <div className="wrapper">
              <div id="V" className="letter">
                V
              </div>
              <div className="shadow">V</div>
            </div>
            <div className="wrapper">
              <div id="E" className="letter">
                E
              </div>
              <div className="shadow">E</div>
            </div>
            <div className="wrapper">
              <div id="♥" className="letter">
                ♥
              </div>
              <div className="shadow">♥</div>
            </div>
            <div className="wrapper">
              <div id="P" className="letter">
                P
              </div>
              <div className="shadow">P</div>
            </div>
            <div className="wrapper">
              <div id="I" className="letter">
                I
              </div>
              <div className="shadow">I</div>
            </div>
            <div className="wrapper">
              <div id="A" className="letter">
                A
              </div>
              <div className="shadow">A</div>
            </div>
            <div className="wrapper">
              <div id="N" className="letter">
                N
              </div>
              <div className="shadow">N</div>
            </div>
            <div className="wrapper">
              <div id="O" className="letter">
                O
              </div>
              <div className="shadow">O</div>
            </div>
          </div>
        </div>
      }
      <div style={{ padding: "2em" }}>
        <h3>Features : </h3>
        <ul>
          <li>
            Practise Space : <a href="/trainpiano">Click here</a>
          </li>
          <li>
            Learning Notes : <a href="/dailychallenge">Click here</a>
          </li>
        </ul>
      </div>

      <div style={{ padding: "2em", overflow: "auto" }}>
        <h3>Introduction</h3>
        <p>
          I've always loved music, simple as that. A while back, I downloaded a
          piano app on my phone and started learning some classic pieces like
          'Mariage d'Amour.' I wasn't great, but it felt good to create music
          instead of just listening. Playing, even imperfectly, brings joy and
          sparks creativity. It made me wonder: What if there was a better way
          to learn piano that captured that feeling of joy and creativity?
        </p>{" "}
        <h3>The Idea Behind the App</h3>{" "}
        <p>
          My journey with that simple piano app made me realize there was room
          for improvement in how we learn music. I envisioned an app that kept
          the fun parts of learning while addressing common frustrations like
          repetitive exercises, slow progress, and lack of personalization.
        </p>{" "}
        <h3>Key Features</h3>{" "}
        <ul>
          {" "}
          <li>
            <b>Diverse Music Library:</b> A collection of pieces for different
            skill levels and tastes, from classical to pop.
          </li>{" "}
          <li>
            <b>Community Space:</b> A place to share progress and connect with
            other learners.
          </li>{" "}
          <li>
            <b>Personalized Recommendations:</b> Suggesting pieces based on your
            style and skill level.
          </li>{" "}
          <li>
            <b>Daily Challenges:</b> Small, fun tasks to keep you motivated and
            practicing regularly.
          </li>{" "}
        </ul>{" "}
        <h3>Building and Sharing</h3>{" "}
        <p>
          I decided to document the app development process publicly. By sharing
          my progress, coding tips, and challenges, I aimed to create a
          community around the app., , and engaging with users and fellow
          developers.
        </p>{" "}
        <h3>For marketing, I'm focusing on :</h3>{" "}
        <ul>
          {" "}
          <li>
            Social media updates (mainly twitter and instragram now).
          </li>{" "}
          <li>Write and share articles.</li>{" "}
          <li>Gradual SEO improvements (creating Landing Pages).</li>{" "}
          <li>Explore directories and direct share my idea.</li>{" "}
        </ul>{" "}
        <h3>Moving Forward</h3>{" "}
        <p>
          This app is my attempt to make learning piano more enjoyable and
          personal. Whether you're into music, tech, or both, I'd love to hear
          your thoughts. Let's explore how we can make learning music more fun
          and accessible for everyone. Remember, you don't need to be an expert
          to enjoy creating music. The joy it brings is what truly matters.
        </p>
      </div>
    </div>
  );
};

export default Home;
