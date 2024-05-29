import React, { useState, useEffect } from "react";
import Logo from "./assets/logo.png";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Footer from "./Footer.jsx";

const AddData = () => {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState(getTodayDate());
  const [completedTill, setcompletedTill] = useState("");
  const [frequency, setFrequency] = useState("");

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !frequency) {
      alert("Title and frequency are required fields");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/HurryUp/tasks/${user.name}`,
        {
          title,
          description,
          createdAt,
          completionTill: completedTill,
          frequency,
        }
      );
      console.log("Task added:", response.data);
      // Optionally reset the form fields after successful submission
      setTitle("");
      setDescription("");
      setCreatedAt(getTodayDate());
      setcompletedTill("");
      setFrequency("");
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  };

  return (
    <>
      <div
        className="w-full"
        style={{
          backgroundImage:
            "url('https://tailwindcss.com/_next/static/media/blog-post-form-dark@90.5b274bea.jpg')",
        }}
      >
        <nav class="bg-inherit border-gray-200">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a
              href="/HurryUp/Dashboard"
              class="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={Logo} class="h-8" alt="Flowbite Logo" />
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Hurry Up
              </span>
            </a>
            <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              {isAuthenticated && (
                <h3 className="text-white mr-6 mt-2">Hello {user.name}</h3>
              )}
              {isAuthenticated ? (
                <button
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={(e) => loginWithRedirect()}
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Get started
                </button>
              )}

              <button
                data-collapse-toggle="navbar-cta"
                type="button"
                class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-cta"
                aria-expanded="false"
              >
                <span class="sr-only">Open main menu</span>
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
            <div
              class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-cta"
            >
              <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                <li>
                  <a
                    href="/HurryUp/dashboard"
                    class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="/HurryUp/ViewTask"
                    class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    My Task
                  </a>
                </li>
                <li>
                  <a
                    href="/HurryUp/Progress"
                    class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Progress
                  </a>
                </li>
                <li>
                  <a
                    href="/HurryUp/AddData"
                    class="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Add Data
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <a href="">
          <h1 className="text-white text-2xl text-center font-bold pt-8 hover:text-4xl">
            Add Your Daily, Weekly or Monthly Wishlist
          </h1>
        </a>
        <div className="min-h-screen flex items-center justify-center">
          <div className=" p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl text-center font-semibold text-green-400 mb-6">
              <a href="">Add New Habit</a>
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-input mt-1 w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-textarea mt-1 w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="createdAt"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Created At
                </label>
                <input
                  type="date"
                  id="createdAt"
                  value={createdAt}
                  onChange={(e) => setCreatedAt(e.target.value)}
                  className="form-input mt-1 w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="completedTill"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Completion till
                </label>
                <input
                  type="date"
                  id="completedTill"
                  value={completedTill}
                  onChange={(e) => setcompletedTill(e.target.value)}
                  className="form-input mt-1 w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="frequency"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Target Frequency
                </label>
                <select
                  id="frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="form-select mt-1 block w-full py-3 px-4 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select frequency...</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Add Habit
              </button>
            </form>
          </div>
        </div>
        {/* <footer class="w-full rounded-lg shadow ">
          <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div class="sm:flex sm:items-center sm:justify-between">
              <a
                href="/HurryUp/dashboard"
                class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
              >
                <img src={Logo} class="h-8" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Hurry Up
                </span>
              </a>
              <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                  <a href="#" class="hover:underline me-4 md:me-6">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:underline me-4 md:me-6">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:underline me-4 md:me-6">
                    Licensing
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2024{" "}
              <a href="https://flowbite.com/" class="hover:underline">
                HurryUp
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </footer> */}
        <Footer />
      </div>
    </>
  );
};

export default AddData;
