"use client"
import { useRouter } from "next/router";
import  Link  from 'next/link';
import { useEffect, useState } from "react";

type BlogEntry = {
    id: number;
    title: string;
    body: string; // Changed from 'content' to 'body' to match the API
    userId: number;
    user?: User;
  }

  type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: number;
        lng: number;
      }
    }
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    }
}


export default function Page({params}:{params:{id:number}}){
    const [blogEntries, setBlogEntries] = useState<BlogEntry[]>([]);

    useEffect(() => {
      async function fetchBlogEntries() {
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        let posts = await postsResponse.json();
  
        // Fetch user data for each post
        posts = await Promise.all(posts.map(async (post: BlogEntry) => {
          const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
          const userData = await userResponse.json();
          console.log({ ...post, user: userData });
          return { ...post, user: userData };
        }));
  
        setBlogEntries(posts);
      }
  
      fetchBlogEntries();
    });
  

  const blog = blogEntries.find(blog => blog.id == params.id);
  if (!blog) {
    return <div>Loading Data</div>;
  }


  return (
    <div className="grid grid-cols-2">
      <nav>
        <u><b>Menu</b></u>
        <ul>
          {blogEntries.map((entry) => (
            <li key={entry.id}>
              <Link href={`/post/${entry.id}`}>
                <h1>📙{entry.title}</h1>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        Blog ID: {blog.id}
        <h1 className="text-3xl font-bold underline">{blog.title}</h1>
        <p className="text-sm italic">By {blog.user ? blog.user.name : 'Unknown Author'} (Tel : {blog.user?.phone})</p>
        <p>{blog.body}</p>
      </div>
    </div>
  );
}