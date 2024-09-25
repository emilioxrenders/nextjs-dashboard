import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-gray-900">
      <p className="text-white w-fit mx-auto text-center font-display font-light py-3">
        <Link href="/">Next.js Cryptocurrency Forecast Dashboard</Link>
      </p>
    </div>
  );
}
