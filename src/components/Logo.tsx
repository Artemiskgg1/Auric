import Image from "next/image";

function Logo() {
  return (
    <div className="flex items-center gap-2 mb-4 ml-2.5">
      <Image
        src="/images/logo.png"
        alt="AURIC Logo"
        width={32}
        height={32}
        className="block"
      />
      <p className="font-semibold font-quichesans text-lg md:text-xl block">
        AURIC
      </p>
    </div>
  );
}

export default Logo;
