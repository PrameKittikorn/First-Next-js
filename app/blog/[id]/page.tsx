import { useRouter } from "next/router";
import  Link  from 'next/link';

type BlogEntry = {
  id: number;
  title: string;
  author: string;
  content: string;
  datePublished: Date;
  slug: string;
}

const blogEntries: BlogEntry[] = [
  { id: 1, title: "Introduction to TypeScript", author: "Jane Doe", content: "Content of the first blog", datePublished: new Date("2023-01-01"), slug: "introduction-to-typescript" },
  { id: 2, title: "Advanced TypeScript Tips", author: "John Smith", content: "Content of the second blog", datePublished: new Date("2023-01-02"), slug: "Advanced-TypeScript-Tips" },
  { id: 3, title: "TypeScript for Beginners", author: "Emily White", content: "Content of the third blog", datePublished: new Date("2023-01-03"), slug: "TypeScript-for-Beginners" },
  { id: 4, title: "Understanding TypeScript Types", author: "Michael Brown", content: "Content of the fourth blog", datePublished: new Date("2023-01-04"), slug: "Understanding-TypeScript-Types" },
  { id: 5, title: "TypeScript and React", author: "Chris Green", content: "Content of the fifth blog", datePublished: new Date("2023-01-05"), slug: "TypeScript-and-React" },
  { id: 6, title: "TypeScript Best Practices", author: "Laura Blue", content: "Content of the sixth blog", datePublished: new Date("2023-01-06"), slug: "TypeScript-Best-Practices" },
  { id: 7, title: "TypeScript and Async Programming", author: "Daniel Yellow", content: "Content of the seventh blog", datePublished: new Date("2023-01-07"), slug: "TypeScript-and-Async-Programming" },
  { id: 8, title: "TypeScript and Node.js", author: "Alice Johnson", content: "Content of the tenth blog", datePublished: new Date("2023-01-10"), slug: "TypeScript-and-Node.js" }
];


export default function Page({params}:{params:{id:string}}){

  const blog = blogEntries.find(blog => blog.slug == params.id);
  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="grid grid-cols-2">
      <nav>
        <u><b>Menu</b></u>
        <ul>
          {blogEntries.map((entry) => (
            <li key={entry.id}>
              <Link href={`/blog/${entry.slug}`}>
                <h1>📙{entry.title}</h1>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        Blog ID: {blog.id}
        <h1 className="text-3xl font-bold underline">{blog.title}</h1>
        <p className="text-sm italic">By {blog.author}</p>
        <p className="text-sm italic">Published on {blog.datePublished.toLocaleDateString()}</p>  
        <p>{blog.content}</p>
      </div>
    </div>
  );
}