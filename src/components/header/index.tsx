import React from "react";
import { UserType } from "../../types";

interface IHeader {
  user?: UserType | null;
}
function Header({ user }: IHeader) {
  return (
    <div className="w-full h-12 px-2 bg-purple-200 shadow-md flex justify-between items-center">
      <h2>LOGO</h2>
      {user && <p>{user.name}</p>}
    </div>
  );
}

export default Header;
