import React from "react";
import { Link } from "react-router-dom";

const posts = [
  {
    id: 1,
    date: "23 Nov",
    author: "admin",
    comments: 1,
    title: "7 Dry Cleaning & Laundry Tips for Cleaner Clothes in OKC",
    excerpt:
      "Finding the best laundromat near you isn’t as simple as just looking for a local location...",
  },
  {
    id: 2,
    date: "23 Nov",
    author: "admin",
    comments: 0,
    title: "A Guide to Doing Laundry and Finding the Best Local Laundromat Near You",
    excerpt:
      "Finding the best laundromat near you isn’t as simple as just looking for a local location...",
  },
  // Add more posts
];

const Blog = () => {
  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
        <div className="flex flex-col gap-10">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <span>{post.date}</span>
                <span className="mx-2">|</span>
                <span>Posted by: {post.author}</span>
                <span className="mx-2">|</span>
                <span>{post.comments} Comments</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{post.title}</h2>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <Link
                to={`/blog/${post.id}`}
                className="text-blue-600 font-semibold hover:underline"
              >
                Read more
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
