import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-black">
      <p className="text-white w-fit mx-auto text-center font-light py-4">
        <Link href="/">Pexels Project</Link>
      </p>
    </div>
  );
}
