import Image from "next/image";
import Link from "next/link";

export default function Hero({ image, alt }) {
  return (
    <div className="relative w-full flex items-center justify-center shadow">
      <Image
        src={`/images/${image}`}
        className="w-full h-full absolute object-center object-cover"
        width={1080}
        height={1080}
        alt={alt}
        priority
      />
      <div
        className="container px-10 flex flex-col gap-2 lg:max-w-4xl text-center z-10 py-32 lg:py-60"
        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
      >
        <h1 className="text-2xl lg:text-4xl text-white">
          Next.js Pexels Project
        </h1>
        <p className="text-white">
          Welcome to my little project working with{" "}
          <Link
            href="https://www.pexels.com/"
            target="_blank"
            className="relative after:w-full after:transition-all after:duration-200 after:left-0 after:absolute after:bg-white after:h-px after:hover:w-0 after:ease-in-out after:bottom-0"
          >
            Pexels'
          </Link>{" "}
          API. This project displays a paginated list of images that navigate to
          a dedicated page for each image. Curious to see how I made this? Check
          it out{" "}
          <Link
            href="https://github.com/emilioxrenders/nextjs-pexels"
            target="_blank"
            className="relative after:w-full after:transition-all after:duration-200 after:left-0 after:absolute after:bg-white after:h-px after:hover:w-0 after:ease-in-out after:bottom-0"
          >
            here!
          </Link>
        </p>
      </div>
    </div>
  );
}
