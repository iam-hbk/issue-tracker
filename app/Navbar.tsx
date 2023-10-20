'use client'

import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const currentPath = usePathname();
  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Issues", href: "/issues" },
    // { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="flex space-x-6 border-b px-5 h-12 items-center">
      <Link href={"/"}>
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li
            key={link.href}
            className={classNames({
              "text-zinc-500": currentPath !== link.href,
              "text-zinc-950 font-bold": currentPath === link.href,
              "hover:text-zinc-900 transition-colors duration-200": true,
            })}
          >
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
