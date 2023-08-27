'use client'

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import logo2 from 'src/assets/logo2.png'
import Image from 'next/image'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

 
  const { data: session, status } = useSession()

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <Image className='rounded-3xl'
                  width={50}
                  height={50}
                  src={logo2}
                  alt='Climbon Logo'
                  />
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <a
                    href="/"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-orange-400 hover:text-gray-700"
                  >
                    Home
                  </a>
                  <a
                    href="/profile"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-orange-400 hover:text-gray-700"
                  >
                    Profile
                  </a>
                  <a
                    href="/newworkout"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-orange-400 hover:text-gray-700"
                  >
                    New Session
                  </a>
                  <a
                    href="/workouthistory"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-orange-400 hover:text-gray-700"
                  >
                    Climb Session History
                  </a>
                  
                  {/* <a
                    href="#"
                    className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-orange-400 hover:text-gray-700"
                  >
                    Blog
                  </a> */}
                  
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                {status === "authenticated" ? (
                  <button
                    type="button"
                    className="relative inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    type="button"
                    className="relative inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    onClick={() => signIn()}
                  >
                    Sign In
                  </button>
                )}
                </div>
                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                  <button
                    type="button"
                    className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {status === "authenticated" && session?.user?.image ? (
                          <img
                            className="h-10 w-10 rounded-full"
                            src={session.user.image}
                            alt=""
                          />
                        ) : null}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                as="a"
                href="/"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-blue-400 hover:bg-blue-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/newworkout"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-blue-400 hover:bg-blue-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                New Session
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/workouthistory"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-blue-400 hover:bg-blue-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                Climb Session History
              </Disclosure.Button>
              {/* <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-blue-400 hover:bg-blue-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                Blog
              </Disclosure.Button>   */}
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center px-4 sm:px-6">
                <div className="flex-shrink-0">
                  {status === "authenticated" && session?.user?.image ? (
                    <img
                      className="h-10 w-10 rounded-full"
                      src={session.user.image}
                      alt=""
                    />
                  ) : null}
                </div>
                <div className="ml-3">
                  {status === "authenticated" && session?.user?.name ? (
                    <div className="text-base font-medium text-gray-800">{session.user.name}</div>
                  ) : null}
                  {/* <div className="text-base font-medium text-gray-800">Tom Cook</div>
                  <div className="text-sm font-medium text-gray-500">tom@example.com</div> */}
                </div>
                <button
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                </button>
              </div>
              <div className="mt-3 space-y-1">
                <Disclosure.Button
                  as="a"
                  href="/profile"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                >
                  Your Profile
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                >
                  Settings
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
