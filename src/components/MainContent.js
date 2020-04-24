import React, { useState, useEffect } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Blog from "./Blog";

export default function MainContent() {
  const [content, setContent] = useState("signIn");

  if (content === "signUp") return <SignUp setContent={setContent} />;
  else if (content === "blog") return <Blog setContent={setContent} />;
  else return <SignIn setContent={setContent} />;

  return (
    <div>
      <SignIn />
    </div>
  );
}
