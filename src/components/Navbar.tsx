import React from "react";

function Navbar(): JSX.Element {
  const handleHomeClick: any = () => {
    window.location.href = "/";
    return false;
  };
  return (
    <div id="nav-bar">
      <div>
        <h1 onClick={handleHomeClick}>CryptoMarketo</h1>
      </div>
      <div id="polygon-ref">
        Powered by <a href="https://polygon.io/">Polygon.io</a>
      </div>
    </div>
  );
}

export default Navbar;
