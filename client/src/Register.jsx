import React from "react";
import Logo from "./assets/logo.png";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const res = await axios
        .post("http://localhost:3000/HurryUp/register", data)
        .then((res) => {
          navigate("/HurryUp/app", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <div className='h-screen px-2 py-2  bg-[url("../components/images/bg.jpg")] lg:flex md:flex  sm:flex-none  font-sans justify-center items-center min-h-screen relative grid-cols-2 '>
      <div className="Col1 text-sm text-white bg-blue-500 p-6 lg:rounded-l-2xl lg:h-3/4 xl:h-3/4 ">
        <div className=" Logo h-8 flex">
          <img className="h-20 w-36" src={Logo} alt="" />
        </div>
        <div className="Banner mt-40  sm:items-center">
          <div
            class="  absolute  lg:right-[590px] lg:top-[40px] lg:rotate-45 lg:z-0 
                 lg:w-[150px] h-[150px] lg:bg-blue-700/70 lg:rounded-xl lg:placeholder:shadow-decorationblock "
          ></div>
          <div
            class=" lg:absolute left-[100px] lg:top-[30%] lg:rotate-45 lg:z-0
                        lg:w-[150px] lg:h-[150px] lg:bg-white/30 lg:rounded-xl lg:shadow-decorationblock"
          ></div>
          <div className="">
            <h1 className=" Welcome text-4xl font-bold md:mt-7">
              Welcome To HurryUp
            </h1>
            <p className=" description1 text-sm font-poppins_regular mt-4">
              Start building better routines, one habit at a time, and unlock
              your full potential with Hurry Up.
            </p>
            <p className="description1 text-sm font-poppins_regular">
              Let's get started on your journey to success!
            </p>
          </div>
          <div className="icon flex ">
            {
              <>
                <div className="Facebook">
                  <div class="w-11 h-11 cursor-pointer bg-white/20 rounded-xl m-3 flex justify-center items-center hover:bg-white hover:text-black duration-500 ease-linear ">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 320 512"
                      class="text-lg "
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                    </svg>
                  </div>
                </div>
                <div className="Twitter">
                  <div class="w-11 h-11 cursor-pointer bg-white/20 rounded-xl m-3 flex justify-center items-center hover:bg-white hover:text-black duration-500 ease-linear ">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 1024 1024"
                      class="text-lg "
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M928 254.3c-30.6 13.2-63.9 22.7-98.2 26.4a170.1 170.1 0 0 0 75-94 336.64 336.64 0 0 1-108.2 41.2A170.1 170.1 0 0 0 672 174c-94.5 0-170.5 76.6-170.5 170.6 0 13.2 1.6 26.4 4.2 39.1-141.5-7.4-267.7-75-351.6-178.5a169.32 169.32 0 0 0-23.2 86.1c0 59.2 30.1 111.4 76 142.1a172 172 0 0 1-77.1-21.7v2.1c0 82.9 58.6 151.6 136.7 167.4a180.6 180.6 0 0 1-44.9 5.8c-11.1 0-21.6-1.1-32.2-2.6C211 652 273.9 701.1 348.8 702.7c-58.6 45.9-132 72.9-211.7 72.9-14.3 0-27.5-.5-41.2-2.1C171.5 822 261.2 850 357.8 850 671.4 850 843 590.2 843 364.7c0-7.4 0-14.8-.5-22.2 33.2-24.3 62.3-54.4 85.5-88.2z"></path>
                    </svg>
                  </div>
                </div>
                <div className="Linkedin ">
                  <div class="w-11 h-11 cursor-pointer bg-white/20 rounded-xl m-3 flex justify-center items-center hover:bg-white hover:text-black duration-500 ease-linear ">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 448 512"
                      class="text-lg "
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                    </svg>
                  </div>
                </div>
              </>
            }
          </div>
          <div className="">
            <p className="text-sm font-poppins_regular ">
              Copyright © Designed & Developed by <a href="#">Garvit</a> 2024
            </p>
            <p className="text-sm font-poppins_regular mt-px sm:justify-center">
              <a className="facebook hover:text-blue-800" href="#">
                Design by Garvit 2024
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="formLogin  p-11 bg-white flex flex-col  lg:w-2/6 lg:rounded-r-2xl lg:h-3/4 xl:h-3/4">
        <p className="text-black text-3xl font-bold mt-2">Register</p>
        <p className=" my-3 text-gray-500 text-base">
          Sign up by entering information below
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="name"
              className="block font-medium text-gray-900 dark:text-white text-lg"
            >
              Your Name
            </label>
            <input
              {...register("name", {
                required: "Name is mandatory",
                validate: {
                  maxLength: (v) =>
                    v.length <= 20 ||
                    "The name should have at most 20 characters",
                },
              })}
              id="name"
              name="name"
              autoComplete="name"
              className="border-2 border-black rounded-md mb-2 w-full justify-center xl:py-1"
              type="name"
              placeholder="Full Name"
            />
            {errors?.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label
              className="block text-lg font-medium leading-6 text-white"
              htmlFor="email"
            >
              Email
            </label>
            {/* <input name="firstName" onChange={handleChange} /> */}
            <input
              {...register("email", {
                required: "Email is required",
                validate: {
                  maxLength: (v) =>
                    v.length <= 50 ||
                    "The email should have at most 50 characters",
                  matchPattern: (v) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "Email address must be a valid address",
                },
              })}
              name="email"
              autoComplete="email"
              className="border-2 border-black text-black rounded-md mb-2 w-full justify-center xl:py-1"
              type="email"
              placeholder="name@gmail.com"
            />
            {errors?.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label
              className="block text-lg font-medium leading-6 text-white"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is Mandatory",
                validate: {
                  maxLength: (v) =>
                    v.length <= 12 ||
                    "The email should have at most 12 characters",
                  minLength: (v) =>
                    v.length >= 8 ||
                    "The email should have at most 8 characters",
                },
              })}
              // onChange={}
              id="password"
              name="password"
              autoComplete="current-password"
              className="border-2 text-black border-black rounded-md mb-2 w-full justify-center xl:py-1"
              type="password"
              placeholder="*****************"
            />
            {errors?.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="mb-12 pb-1 pt-4 text-center">
            {/* <TERipple className="w-full"> */}
            <button
            type="submit"
              className={
                "btnSignin w-full  bg-blue-600 hover:bg-blue-800  hover:-translate-y-1 hover:scale-110  p-2 rounded-xl text-white my-3 sm:text-center"
              }
            >
              Register
            </button>
          </div>
        </form>
        <div className="confirmAccount flex  ">
            <p className="text-gray-500 lg:text-lg sm:text-sm ">
              Already have an account?
            </p>
            <a
              className="text-decoration-line: none; text-blue-600 lg:text-lg sm:text-sm hover:text-red-600 ml-2"
              href="/HurryUp/app"
            >
              Sign In
            </a>
          </div>
      </div>
    </div>
  );
};

export default Register;
