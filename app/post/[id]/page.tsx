"use client"
import { useRouter } from "next/router";
import  Link  from 'next/link';
import { useEffect, useState } from "react";

type BlogEntry = {
    id: number;
    title: string;
    body: string; // Changed from 'content' to 'body' to match the API
    userId: number;
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
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
      async function fetchBlogEntries() {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();

        const response2 = await fetch('https://jsonplaceholder.typicode.com/users');
        const data2 = await response2.json();
        setUsers(data2);
        setBlogEntries(data);
      }
  
      fetchBlogEntries();
    }, []);
  

  const blog = blogEntries.find(blog => blog.id == params.id);
  if (!blog) {
    return <div>Loading Data</div>;
  }

  const user = users.find(user => user.id === blog.userId);


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
        <p className="text-sm italic">By {user ? user.name : 'Unknown Author'} (Tel : {user?.phone})</p>
        <p>{blog.body}</p>
      </div>
    </div>
  );
}