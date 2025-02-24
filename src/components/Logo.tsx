import { SwitchCamera } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
// import { calSans } from "@/app/fonts";

function Logo() {
  return (
    <Link
      href={"/dashboard"}
      className={buttonVariants({
        className:
          "hidden md:flex navLink !mb-10 lg:hover:bg-transparent lg:!p-0",
        variant: "ghost",
        size: "lg",
      })}
    >
      <p
        className={`font-semibold text-xl hidden lg:block `}
        // ${calSans.className}
      >
        AURIC
      </p>
    </Link>
  );
}

export default Logo;
