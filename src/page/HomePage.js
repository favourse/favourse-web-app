import React from "react";
import HeaderSection from "../component/HeaderSection";
import { Helmet } from "react-helmet";
const HomePage = () => {
  return (
    <div className="h-full min-h-screen bg-gradient-to-r from-violet-800 to-violet-900 z-10">
      <Helmet>
        <title>Favourse</title>
      </Helmet>
      <HeaderSection />
      <div className="relative isolate px-6 lg:px-8">
        <div
          className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 md:py-24 sm:py-48">
          <div className="text-center">
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white sm:text-6xl">
              Favourse Event Enabler Platform
            </h1>
            <p className="mt-6 text-md leading-8 text-white/70">
              Connecting Passion, Empowering Creators, Unleashing Event Success.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/create-event"
                className="text-white  duration-200 hover:shadow-lg shadow-white bg-violet-600/70 hover:bg-violet-600 rounded-lg px-4 py-2 items-center flex-row font-semibold leading-6 "
              >
                Create Event
              </a>
              <a
                href="https://favourse.com/favourse-platform"
                target="_BLANK"
                className="text-sm font-semibold leading-6 text-white/50 hover:text-white/90"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="hidden sm:mt-24 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-xs leading-6 text-white/90 ring-1 ring-white/10 hover:ring-white/50">
                Announcing our Token Pre-Sale.{" "}
                <a
                  href="https://token.favourse.com"
                  target="_BLANK"
                  className="font-semibold text-white"
                >
                  <span className="absolute inset-0" aria-hidden="true" />
                  Read more <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
