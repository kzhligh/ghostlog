import { React, useState } from "react";
import Time from "../components/Time";
import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();
  // const [user, setUser] = useState("");
  // setUser("...");

  // if (location !== null) setUser(location.state.username);

  let user = "";
  if (location.state !== null) {
    user = location.state.username;
  }

  return (
    <div>
      Welcome to your Dashboard {user}
      <Time />
    </div>
  );
}
