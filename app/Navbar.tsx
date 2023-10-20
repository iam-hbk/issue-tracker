import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const Navbar = () => {
  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Issues", href: "/issues" },
    // { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="flex justify-between border-b px-5 h-12 items-center">
      <Link href={"/"}>
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li
            key={link.href}
            className="text-zinc-500 hover:text-zinc-950 transition-colors duration-200"
          >
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
