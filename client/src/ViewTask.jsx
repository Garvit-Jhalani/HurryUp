import React, { useEffect, useState } from "react";
import Logo from "./assets/logo.png";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import SetReminder from "./SetReminder.jsx";

const ViewTask = () => {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const [tasks, setTasks] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [taskToComplete, setTaskToComplete] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/HurryUp/tasks/${user.name}`
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/HurryUp/tasks/${user.name}`
          );
          console.log(response.data);
          setTasks(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [user]);

  // Function to filter tasks by frequency
  const filterTasksByFrequency = (frequency) => {
    return tasks.filter((task) => task.frequency === frequency);
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(
        `http://localhost:3000/HurryUp/tasks/${user.name}/${taskId}`
      );
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleTask = async (taskId) => {
    try {
      await axios.patch(
        `http://localhost:3000/HurryUp/tasks/${user.name}/${taskId}`,
        {
          completed: true,
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, completed: true } : task
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  };
  const handleCompletionUpdate = async (taskId, completed) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/HurryUp/tasks/${user.name}/${taskId}`,
        { completed }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId
            ? { ...task, completed: response.data.completed }
            : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  const handleShowCompletionModal = (taskId) => {
    setTaskToComplete(taskId);
    setShowCompletionModal(true);
  };

  const handleCloseCompletionModal = () => {
    setShowCompletionModal(false);
    setTaskToComplete(null);
  };

  const handleConfirmCompletion = () => {
    if (taskToComplete !== null) {
      handleCompletionUpdate(taskToComplete, completed);
      handleCloseCompletionModal();
    }
  };

  const openModal = (taskId) => {
    setTaskToDelete(taskId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setTaskToDelete(null);
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (taskToDelete !== null) {
      handleDelete(taskToDelete);
    }
    closeModal();
  };
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
        <nav className="bg-inherit border-gray-200">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a
              href="/HurryUp/Dashboard"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={Logo} className="h-8" alt="Flowbite Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Hurry Up
              </span>
            </a>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
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
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={(e) => loginWithRedirect()}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Get started
                </button>
              )}
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-cta"
                aria-expanded={menuOpen ? "true" : "false"}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
            <div
              className={`items-center justify-end w-full md:flex md:w-auto md:order-1 ${
                menuOpen ? "flex" : "hidden"
              }`}
              id="navbar-cta"
            >
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                <li>
                  <a
                    href="/HurryUp/dashboard"
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="/HurryUp/ViewTask"
                    className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                    aria-current="page"
                  >
                    My Task
                  </a>
                </li>
                <li>
                  <a
                    href="/HurryUp/Progress"
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Progress
                  </a>
                </li>
                <li>
                  <a
                    href="/HurryUp/AddData"
                    className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Add Data
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <button
          type="button"
          class="float-right 2xl:mr-32 lg:mr-12 sm:mr-24 mt-8 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          <a href="/HurryUp/AddData">+ New Task</a>
        </button>
        <div className="2xl:flex xl:flex lg:flex justify-evenly mt-36 justify-center">
          <div className="2xl:flex-1 xl:flex-1 lg:flex-1 ml-24">
            <h2 className="font-bold ml-24 text-3xl bg-gradient-to-r from-white via-purple-200 to-purple-300 inline-block text-transparent bg-clip-text ">
              Daily Tasks
            </h2>
            <div className="container mx-auto py-12">
              {/* Daily Tasks */}
              <div className=" mt-12 ">
                {filterTasksByFrequency("daily").map((task, index) => (
                  <Link>
                    <div className="bg-white px-8 py-6 rounded-lg shadow-md w-96 mb-12 hover:bg-rose-100">
                      <h2 className="inline-block font-semibold text-lg">
                        {index + 1}.
                      </h2>
                      <h1 className="font-bold underline text-2xl ml-8 inline-block">
                        {task.title}
                      </h1>
                      {task.completed ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 text-green-600 float-right mt-2"
                        >
                          <title>Daily Task Completed</title>
                          <path
                            fillRule="evenodd"
                            d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <button
                          onClick={() => handleShowCompletionModal(task._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6 text-red-600 ml-36"
                          >
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                          </svg>
                        </button>
                      )}
                      <p className="mt-4">{task.description}</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 float-right mt-4"
                        onClick={() => openModal(task._id)}
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <p>
                        <b>Starting Date:</b>{" "}
                        {new Date(task.createdAt).toLocaleDateString()}
                      </p>
                      <p>
                        <b>Completion Date:</b>{" "}
                        {new Date(task.completionTill).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="2xl:flex-1 xl:flex-1 lg:flex-1 justify-center">
            <h2 className="font-bold ml-20 text-3xl bg-gradient-to-r from-white via-purple-200 to-purple-300 inline-block text-transparent bg-clip-text ">
              Weekly Tasks
            </h2>
            <div className="container mx-auto py-12">
              {/* Weekly Tasks */}
              <div className=" mt-12 ">
                {filterTasksByFrequency("weekly").map((task, index) => (
                  <Link>
                    <div
                      key={task.id}
                      className="bg-white px-8 py-6 rounded-lg shadow-md w-96 mb-12 hover:bg-fuchsia-200"
                    >
                      <h2 className="inline-block font-semibold text-lg">
                        {index + 1}.
                      </h2>
                      <h1 className="font-bold underline text-2xl ml-8 inline-block">
                        {task.title}
                      </h1>
                      {task.completed ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 text-green-600 float-right mt-2"
                        >
                          <title>Weekly Task Completed</title>
                          <path
                            fillRule="evenodd"
                            d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <button
                          onClick={() => handleShowCompletionModal(task._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6 text-red-600 ml-36"
                          >
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                          </svg>
                        </button>
                      )}
                      <p className="mt-4">{task.description}</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 float-right mt-4 cursor-pointer"
                        onClick={() => openModal(task._id)}
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p>
                        <b>Starting Date:</b>{" "}
                        {new Date(task.createdAt).toLocaleDateString()}
                      </p>
                      <p>
                        <b>Completion Date:</b>{" "}
                        {new Date(task.completionTill).toLocaleDateString()}
                      </p>
                      {/* <SetReminder taskId={task._id} /> */}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="2xl:flex-1 xl:flex-1 lg:flex-1">
            <h2 className="font-bold ml-20 text-3xl bg-gradient-to-r from-white via-purple-200 to-purple-300 inline-block text-transparent bg-clip-text ">
              Monthly Tasks
            </h2>
            <div className="container mx-auto py-12">
              {/* Monthly Tasks */}
              <div className=" mt-12 ">
                {filterTasksByFrequency("monthly").map((task, index) => (
                  <Link>
                    <div className="bg-white px-8 py-6 rounded-lg shadow-md w-96 mb-12 hover:bg-indigo-200">
                      <h2 className="inline-block font-semibold text-lg">
                        {index + 1}.
                      </h2>
                      <h1 className="font-bold underline text-2xl ml-8 inline-block">
                        {task.title}
                      </h1>
                      {task.completed ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 text-green-600 float-right mt-2"
                        >
                          <title>Monthly Task Completed</title>
                          <path
                            fillRule="evenodd"
                            d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <button
                          className="float-right"
                          onClick={() => handleShowCompletionModal(task._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6 text-red-600"
                          >
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                          </svg>
                        </button>
                      )}
                      <p className="mt-4">{task.description}</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 float-right mt-4 cursor-pointer"
                        onClick={() => openModal(task._id)}
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p>
                        <b>Starting Date:</b>{" "}
                        {new Date(task.createdAt).toLocaleDateString()}
                      </p>
                      <p>
                        <b>Completion Date:</b>{" "}
                        {new Date(task.completionTill).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
              <p className="mb-4">Are you sure you want to delete this task?</p>
              <div className="flex justify-end">
                <button
                  onClick={confirmDelete}
                  className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded mr-2"
                >
                  Yes, delete
                </button>
                <button
                  onClick={closeModal}
                  className="text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {showCompletionModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-4">Task Completion</h2>
              <p>Mark this task as completed?</p>
              <div className="mt-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    checked={completed}
                    onChange={() => setCompleted(!completed)}
                  />
                  <span className="ml-2">Completed</span>
                </label>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={handleCloseCompletionModal}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-green-600 text-white ml-2 rounded"
                  onClick={handleConfirmCompletion}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};

export default ViewTask;
