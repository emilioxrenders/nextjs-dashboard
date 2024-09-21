import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-gray-900">
      <p className="text-white w-fit mx-auto text-center font-display font-light py-3">
        <Link href="/">Nextjs Dashboard</Link>
      </p>
    </div>
  );
}
