import React, { useState, useEffect } from "react";
import BlogPanel from "./BlogPanel";
import axios from "axios";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function getBlogs() {
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
    }
    getBlogs();
  }, []);

  return (
    <div>
      {blogs.map((blog) => (
        <BlogPanel blog={blog} key={blog.id} />
      ))}
    </div>
  );
}

const blogStyle = {};
