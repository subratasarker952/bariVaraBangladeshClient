import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const UserLayout = () => {
  const { logOutUser } = useAuth();

  const menu = (
    <>
      <NavLink
        className=" capitalize hover:rounded-full px-4 py-2 text-center m-1 hover:bg-green-500 active:bg-black  hover:text-white"
        to=""
      >
        Dashboard
      </NavLink>
      <NavLink
        className=" capitalize hover:rounded-full px-4 py-2 text-center m-1 hover:bg-green-500 active:bg-black  hover:text-white"
        to="profile"
      >
        Profile
      </NavLink>
      <NavLink
        className=" capitalize hover:rounded-full px-4 py-2 text-center m-1 hover:bg-green-500 active:bg-black  hover:text-white"
        to="addProperty"
      >
        Add Property
      </NavLink>

      <NavLink
        className=" capitalize hover:rounded-full px-4 py-2 text-center m-1 hover:bg-green-500 active:bg-black  hover:text-white"
        to="myProperty"
      >
        My Property
      </NavLink>

      <button
        className=" bg-red-500 px-4 py-2 rounded-full text-center m-1  active:bg-black text-white "
        onClick={() => logOutUser()}
      >
        Logout
      </button>
    </>
  );
  return (
    <>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="w-full navbar bg-base-300">
            <div className="flex-none lg:hidden bg-white p-2 print:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 text-green-500 text-3xl bg-white  p-3">
              <NavLink className=" capitalize" to="/">
                BariVara 
              </NavLink>
            </div>
            <div className="flex-none hidden lg:block bg-white">
              <ul className="menu menu-horizontal">{menu}</ul>
              {/* Navbar menu content here */}
            </div>
          </div>
          {/* Page content here */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            {/* Sidebar content here */}
            {menu}
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserLayout;
