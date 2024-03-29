import Link from "next/link";
import axios from "axios";

export const revalidate = 1000;

async function getBlogs() {

  try {

    const response = await axios.get(`${process.env.domain}/api/blogs`);

    return response.data.data;

  } catch (error) {

    console.log("Error");

  }

};

export default async function Home() {

  const blogs = await getBlogs();

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">
          Blogs
        </h1>

        <button className="btn-contained">
          <Link href="/add-blog">Add Blog</Link>
        </button>
      </div>

      <div className="grid grid-cols-4 gap-5 mt-5">
        {blogs?.map((blog) => (
          <Link href={`/blog/${blog.id}`} key={blog.id}>
            <div className="cursor-pointer border p-5 rounded border-gray-400">
              <img
                src={blog.image}
                alt={blog.title}
                className="h-52 w-full object-cover rounded"
              />
              <h1 className="text-gray-700 mt-2">{blog.title}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};