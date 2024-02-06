import React from "react";

function Header() {
  return (
    <>
      <header className="fixed top-0 z-50 flex h-header w-full shrink-0 items-center justify-between bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-lg">
        <div className="drawer w-16">
          <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label
              id="nav-content"
              htmlFor="nav-drawer"
              className="btn btn-square btn-ghost drawer-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
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
          <div className="drawer-side">
            <label
              id="nav-side"
              htmlFor="nav-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="p-6 flex flex-1 flex-col items-stretch justify-start h-screen w-80 bg-base-200 text-base-content">
              Content
            </div>
          </div>
        </div>
      </header>
      <div className="h-header" />
    </>
  );
}

export default Header;
