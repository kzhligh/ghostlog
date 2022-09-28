import React from "react";

export default function Time() {
  const date = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return <div>{date}</div>;
}
