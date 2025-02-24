"use client";

import {
  Clapperboard,
  Compass,
  Heart,
  Home,
  MessageCircle,
  PlusSquare,
  Search,
  OctagonAlert,
  Users,
  HandCoins,
  Newspaper,
} from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  {
    name: "Alerts",
    href: "/dashboard/alerts",
    icon: OctagonAlert,
    hideOnMobile: true,
  },
  { name: "Community", href: "/dashboard/community", icon: Users },
  {
    name: "Explore",
    href: "/dashboard/explore",
    icon: Compass,
  },
  {
    name: "Support",
    href: "/dashboard/support",
    icon: HandCoins,
  },
  {
    name: "News",
    href: "/dashboard/news",
    icon: Newspaper,
    hideOnMobile: true,
  },
];

function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={buttonVariants({
              variant: isActive ? "secondary" : "ghost",
              className: cn("navLink", { "hidden md:flex": link.hideOnMobile }),
              size: "lg",
            })}
          >
            <LinkIcon className="w-6" />
            <p
              className={`${cn("hidden lg:block", {
                "font-extrabold": isActive,
              })}`}
            >
              {link.name}
            </p>
          </Link>
        );
      })}
    </>
  );
}

export default NavLinks;
