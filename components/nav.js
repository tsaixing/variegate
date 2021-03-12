import {Component} from "react";
import Link from "next/link";

const links = [
  {
    href: "/shop",
    label: "Shop",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/faq",
    label: "FAQ",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

export default class Nav extends Component {
  render() {
    return (
      <nav className="container mx-auto">

        {/* LEFT */}
        <ul className="flex justify-between items-center p-8">
          <li>
            <Link href="/">
              Home
            </Link>
          </li>

          {/* RIGHT */}
          <ul className="flex justify-between items-center space-x-4">
            {links.map(({href, label}) => (
              <li key={`${href}${label}`}>
                <Link href={href}>
                    {label}
                </Link>
              </li>
            ))}
          </ul>
        </ul>

      </nav>
    );
  }
}
