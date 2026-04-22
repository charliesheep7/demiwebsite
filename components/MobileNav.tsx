'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { Fragment, useState, useEffect, useRef } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import { AppStoreButton } from './AppStoreButton'

export default function MobileNav() {
  const [navShow, setNavShow] = useState(false)
  const navRef = useRef<HTMLDivElement | null>(null)

  const onToggle = () =>
    setNavShow((s) => {
      if (s) enableBodyScroll(navRef.current as unknown as HTMLElement)
      else disableBodyScroll(navRef.current as unknown as HTMLElement)
      return !s
    })

  useEffect(() => clearAllBodyScrollLocks, [])

  return (
    <>
      <button
        aria-label="Open menu"
        onClick={onToggle}
        className="text-ink hover:text-lav-500 p-2 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-6 w-6"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <Transition appear show={navShow} as={Fragment} unmount={false}>
        <Dialog as="div" onClose={onToggle} unmount={false}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            unmount={false}
          >
            <div className="fixed inset-0 z-[60] bg-[rgb(42_35_57_/_0.2)] backdrop-blur-sm" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="transition ease-out duration-300 transform"
            enterFrom="opacity-0 translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-200 transform"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-2"
            unmount={false}
          >
            <DialogPanel className="fixed inset-0 z-[70] bg-[rgb(250_244_234_/_0.96)] backdrop-blur-2xl">
              <div
                ref={navRef}
                className="flex h-full flex-col items-start justify-center gap-8 px-8"
              >
                {headerNavLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    onClick={onToggle}
                    className="t-h3 text-ink hover:text-lav-500 font-serif transition-colors"
                  >
                    {link.title}
                  </Link>
                ))}
                <div className="mt-8">
                  <AppStoreButton size="md" />
                </div>
              </div>

              <button
                onClick={onToggle}
                aria-label="Close menu"
                className="text-ink hover:text-lav-500 fixed top-5 right-5 z-[80] p-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  )
}
