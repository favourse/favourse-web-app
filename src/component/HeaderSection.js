import { useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import FavLogoWhite from "../assets/Favourse Logo White.png";
import FavLogo from "../assets/Favourse Logo.png";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ConnectButton from "./other/ConnectButton";

export default function HeaderSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="z-20">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 z-20">
            <span className="sr-only">Favourse</span>
            <img
              className="h-8 w-auto "
              src={FavLogoWhite}
              alt="Favourse Logo"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden items-center z-20 lg:flex lg:gap-x-12">
          <a
            href="/discover"
            className="text-sm font-semibold leading-6 text-white"
          >
            Discover
          </a>
          <a
            href="/create-event"
            className="text-sm font-semibold leading-6 text-white"
          >
            Create Event
          </a>
        </Popover.Group>
        <ConnectButton />
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Favourse</span>
              <img
                className="h-8 w-auto z-30"
                src={FavLogo}
                alt="Favourse Logo"
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="/discover"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-700 hover:bg-gray-50"
                >
                  Discover
                </a>
                <a
                  href="/create-event"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-700 hover:bg-gray-50"
                >
                  Create Event
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3  flex flex-row justify-center text-white bg-primary-color  p-2 items-center rounded-lg px-3 py-2.5 text-base font-semibold leading-7  hover:bg-gray-50"
                >
                  Connect
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="#ffffff"
                    className="w-5 h-5 ml-1"
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
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
