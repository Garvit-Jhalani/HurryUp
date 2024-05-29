import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Auth() {
  return (
    <>
      <div className="h-screen w-full justify-center items-center scrollbar-hide overflow-y-scroll" style={{backgroundImage: "url('https://tailwindcss.com/_next/static/media/blog-post-form-dark@90.5b274bea.jpg')"}}>
        <Outlet />
      </div>
    </>
  );
}