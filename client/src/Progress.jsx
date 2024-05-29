import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAuth0 } from "@auth0/auth0-react";
import Logo from "./assets/logo.png";
import Footer from "./Footer.jsx";

const COLORS = ["#00C49F", "#FF8042"];

const Progress = () => {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const [tasks, setTasks] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/HurryUp/tasks/${user.name}`
        );
        setTasks(response.data);
        const completedTasks = response.data.filter(
          (task) => task.completed
        ).length;
        const incompleteTasks = response.data.length - completedTasks;
        setChartData([
          { name: "Completed", value: completedTasks },
          { name: "Incomplete", value: incompleteTasks },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

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
                    class="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Progress
                  </a>
                </li>
                <li>
                  <a
                    href="/HurryUp/AddData"
                    class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Add Data
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="h-screen w-full flex flex-col items-center justify-center">
          <h1 className="text-3xl text-white font-bold mb-8">Task Completion Progress</h1>
          <div className="w-3/4 h-3/4">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Progress;