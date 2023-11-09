import React, { useEffect, useState } from "react";
import * as AuthService from "../../auth/AuthService";
import { truncateFromMiddle } from "../../utils";
import ICPLogo from "../../assets/icp-logo.png";

export default function LoginButton() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkIfAuthenticated = async () => {
      const isAuthenticated = await AuthService.isAuthenticated();
      if (isAuthenticated) {
        const principalUserId = await AuthService.getPrincipalId();

        setUser({ principalUserId });
      }
    };

    checkIfAuthenticated();
  }, []);

  const handleLogin = async () => {
    await AuthService.login(() => {
      // Perform actions after successful login
      window.location.reload(); // or use React Router to redirect
    });
  };

  const handleLogout = async () => {
    await AuthService.logout(() => {
      window.location.reload();
    });
    setUser(null);
    // Redirect to home page or login page
  };

  return (
    <div className="z-10">
      {user ? (
        <div>
          <div
            onClick={handleLogout}
            className=" hover:cursor-pointer z-20 text-sm flex text-white  duration-200 hover:shadow-lg shadow-white bg-violet-600/[.6] justify-between hover:bg-violet-600 rounded-lg px-4 py-2 items-center flex-row font-semibold leading-6 "
          >
            <img
              className="h-3 mr-1 w-auto hidden md:block"
              src={ICPLogo}
              alt="ICO Logo"
            />
            <div className="hidden md:block">
              {truncateFromMiddle(user.principalUserId, 10)}{" "}
            </div>
            <div className="block md:hidden">
              <div className="flex flex-row items-center">
                <img
                  className="h-3 mr-1 w-auto "
                  src={ICPLogo}
                  alt="ICO Logo"
                />
                {truncateFromMiddle(user.principalUserId, 20)}{" "}
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="#ffffff"
              className="w-5 h-5 ml-1 "
            >
              <path
                fillRule="evenodd"
                d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      ) : (
        <div
          onClick={handleLogin}
          className="z-20 text-sm justify-between hover:cursor-pointer flex text-white  duration-200 hover:shadow-lg shadow-white bg-violet-600/[.6] hover:bg-violet-600 rounded-lg px-4 py-2 items-center flex-row font-semibold leading-6 "
        >
          Login{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="#ffffff"
            className="w-5 h-5 ml-1 "
          >
            <path
              fillRule="evenodd"
              d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
