import React from "react";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <>
      <div
        className="h-screen w-full flex flex-col justify-center items-center scrollbar-hide overflow-y-scroll"
        style={{
          backgroundImage:
            "url('https://tailwindcss.com/_next/static/media/blog-post-form-dark@90.5b274bea.jpg')",
        }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to Hurry Up
          </h1>
          <Link to="/HurryUp/Dashboard">
            <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Go To Dashboard
              </span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default App;
