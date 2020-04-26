import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Blog from "./Blog";

export default function MainContent({
  content,
  setContent,
  username,
  setUsername,
  password,
  setPassword,
}) {
  function render() {
    console.log("content", content);

    if (content === "signUp")
      return (
        <SignUp
          content={content}
          setContent={setContent}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      );
    else if (content === "blog")
      return (
        <Blog
          content={content}
          setContent={setContent}
          username={username}
          setUsername={setUsername}
        />
      );
    else
      return (
        <SignIn
          content={content}
          setContent={setContent}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      );
  }
  return <div>{render()}</div>;
}
