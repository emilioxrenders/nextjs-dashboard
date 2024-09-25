import React from "react";

export default function Layout({ children }) {
  return (
    <div className="container pb-10 mx-auto flex flex-col font-display font-light px-10">
      {children}
    </div>
  );
}
