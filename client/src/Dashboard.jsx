import React from "react";
import Logo from "./assets/logo.png";
import { useAuth0 } from "@auth0/auth0-react";
import mobilePhoto1 from "./assets/phone2.png";
import section2 from "./assets/middlePart2.png";
import Footer from "./Footer.jsx";

const Dashboard = () => {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  // console.log(user);
  return (
    <>
      <nav class="bg-inherit border-gray-200 scrollbar-hide">
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
                  logout({ logoutParams: { returnTo: window.location.origin } })
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
                  href="/HurryUp/Dashboard"
                  class="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                  aria-current="page"
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
                  class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Add Data
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="flex overflow-y-scroll scrollbar-hide">
        <div className="flex-1 w-full h-full ml-8">
          <h1 className="text-4xl pb-2 mt-32 ml-14 font-bold bg-gradient-to-r from-white via-purple-200 to-purple-300 inline-block text-transparent bg-clip-text">
            Design Your Habits.
          </h1>
          <br />
          <h1 className="text-4xl ml-14 font-bold bg-gradient-to-r from-white via-purple-200 to-purple-300 inline-block text-transparent bg-clip-text">
            Unlock Your Potential
          </h1>
          <h1 className="text-xl mt-8 ml-14 text-white">
            Build better habit that stick this time.
          </h1>
          <div className="inline-block font-bold text-white text-2xl ml-14 mr-4 mt-8">
            Track Your Habits
          </div>
          <div className="inline-block">
            <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Get Started
              </span>
            </button>
          </div>
          <br />
          <div className="pl-8 mt-12 ml-4 inline-block">
            <button
              type="button"
              class="flex items-center justify-center w-48 mt-3 text-white bg-black h-14 rounded-xl"
            >
              <div class="mr-3">
                <svg viewBox="0 0 384 512" width="30">
                  <path
                    fill="currentColor"
                    d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                  ></path>
                </svg>
              </div>
              <div>
                <div class="text-xs">Download on the</div>
                <div class="-mt-1 font-sans text-xl font-semibold">
                  App Store
                </div>
              </div>
            </button>
          </div>
          <div className="inline-block ml-6 pb-1">
            <button
              type="button"
              class="flex items-center justify-center w-48 mt-3 text-white bg-black rounded-lg h-14"
            >
              <div class="mr-3">
                <svg viewBox="30 336.7 120.9 129.2" width="30">
                  <path
                    fill="#FFD400"
                    d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
                  ></path>
                  <path
                    fill="#FF3333"
                    d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
                  ></path>
                  <path
                    fill="#48FF48"
                    d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
                  ></path>
                  <path
                    fill="#3BCCFF"
                    d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
                  ></path>
                </svg>
              </div>
              <div>
                <div class="text-xs">GET IT ON</div>
                <div class="-mt-1 font-sans text-xl font-semibold">
                  Google Play
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="flex-1">
          <img className="w-full h-full" src={mobilePhoto1} alt="" />
        </div>
      </div>
      <div
        className="w-full mt-8"
        style={{
          backgroundImage:
            "url('https://tailwindcss.com/_next/static/media/blog-post-form-dark@90.5b274bea.jpg')",
        }}
      >
        <h1 className="font-bold ml-96 pl-6 mt-6 text-3xl bg-gradient-to-r from-white via-purple-200 to-purple-300 inline-block text-transparent bg-clip-text">
          Track your daily habits, stay motivated, and make
        </h1>
        <br />
        <h1 className="font-bold ml-80 pl-48 mt-2 text-3xl bg-gradient-to-r from-white via-purple-200 to-purple-300 inline-block text-transparent bg-clip-text">
          progress towards your aspirations.
        </h1>
        <img className="w-full h-full" src={section2} alt="" />
        <div className="flex space-x-12 mx-24 pb-24">
          <div className="flex-1 h-52 w-24 border-2 border-slate-400 rounded-md">
            <a href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-8 h-8 pl-4 pt-4 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                />
              </svg>
              <h1 className="text-white p-6 text-xl">
                As you progress, your habits become ingrained, woven into the
                fabric of your daily routine. Each day, you add another link to
                the chain of your achievements.
              </h1>
            </a>
          </div>
          <div className="flex-1 h-52 w-24 border-2 border-slate-400 rounded-md">
            <a href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-8 h-8 pl-4 pt-4 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
              <h1 className="text-white p-6 text-xl">
                Start with the smallest of habits, those so simple they seem
                effortless. These tiny actions, when repeated consistently,
                compound over time, leading to remarkable long-term growth.
              </h1>
            </a>
          </div>
          <div className="flex-1 h-52 w-24 border-2 border-slate-400 rounded-md">
            <a href="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-8 h-8 pl-4 pt-4 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                />
              </svg>
              <h1 className="text-white p-6 text-lg">
                With every completed task, your momentum grows, propelling you
                forward towards your goals. The initial resistance fades away,
                replaced by a sense of fulfillment and accomplishment.
              </h1>
            </a>
          </div>
        </div>
        <Footer />
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
      </div>
    </>
  );
};

export default Dashboard;
