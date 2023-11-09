import { useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import FavLogoWhite from "../assets/Favourse Logo White.png";
import FavLogo from "../assets/Favourse Logo.png";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ConnectButton from "./other/ConnectButton";
import LoginButton from "./other/LoginButton";

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
          <LoginButton />
        </Popover.Group>
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
                <LoginButton />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
