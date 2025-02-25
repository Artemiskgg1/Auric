import Image from "next/image";

function Logo() {
  return (
    <div className="flex items-center gap-2 mb-4 ml-2.5">
      <Image
        src="/images/logo.png"
        alt="AURIC Logo"
        width={32}
        height={32}
        className="hidden lg:block"
      />
      <p className="font-semibold text-xl hidden lg:block">AURIC</p>
    </div>
  );
}

export default Logo;
