import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import BlogPanel from "./BlogPanel";
import axios from "axios";
import { withTheme } from "@material-ui/core";

export default function Blog({ setContent }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function getBlogs() {
      try {
        const request = await axios({
          method: "get",
          url: "http://localhost:4000/blogs",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        //   console.log(await request.data[0]);
        setBlogs(await request.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
    getBlogs();
  }, []);

  return (
    <div>
      <Button onClick={() => setContent("write")} style={buttonStyle}>
        Create Blog
      </Button>
      <div style={blogStyle}>
        {blogs.map((blog) => (
          <BlogPanel blog={blog} key={blog.id} />
        ))}
      </div>
    </div>
  );
}

const blogStyle = {
  marginTop: 20,
};

const buttonStyle = {
  marginTop: 20,
  backgroundColor: "black",
  color: "white",
  borderRadius: 25,
  padding: 10,
};
