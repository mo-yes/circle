import { Link, useLocation } from "react-router-dom";
{/* NavLinks Component */}
export default function NavLinks({ onLinkClick }) {
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <ul className="hidden sm:flex gap-6">
      {links.map((link) => (
        <li key={link.path}>
          <Link
            to={link.path}
            onClick={onLinkClick}
            className={
              location.pathname === link.path
                ? "nav-link-active"
                : "nav-link"
            }
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
