"use client";

import React, { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = (num: number) => num.toString().padStart(2, "0");

  const hours = formattedTime(time.getHours());
  const minutes = formattedTime(time.getMinutes());
  const seconds = formattedTime(time.getSeconds());

  return (
    <span className="pt-2 text-center">
      <span className="font-mono font-bold">
        {hours} : {minutes} : {seconds}
      </span>
      {/* <p className="text-sm text-gray-500">
        {time.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </p>
      <p className="text-sm text-gray-500">
        {time.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </p> */}
    </span>
  );
}
