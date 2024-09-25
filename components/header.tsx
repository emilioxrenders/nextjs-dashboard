import React, { useState, useEffect } from "react";

export default function Header() {
  const [currentTime, setCurrentTime] = useState<string>(new Date().toUTCString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toUTCString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-gray-900 sticky top-0">
      <p className="text-white w-fit text-center font-display font-light py-3 mx-auto">
        Current UTC Time: {currentTime}
      </p>
    </div>
  );
}
