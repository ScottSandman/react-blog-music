import React, { useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import MainContent from "./components/MainContent";

function App() {
  const [content, setContent] = useState("signIn");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="App">
      <Nav
        content={content}
        setContent={setContent}
        username={username}
        setUsername={setUsername}
      />
      <div style={{ marginTop: 100 }}>
        <MainContent
          content={content}
          setContent={setContent}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    </div>
  );
}

export default App;
