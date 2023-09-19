import React from "react";
import Class from "./style.module.scss";

function Header() {
  return (
    <header className={Class.headerContainer}>
      <div className={Class.headerTxt}>USER'S INVENTORY</div>
      <img
        src="https://www.w3schools.com/howto/img_avatar.png"
        alt="Avatar"
        className={Class.avatar}
      />
    </header>
  );
}

export default Header;
