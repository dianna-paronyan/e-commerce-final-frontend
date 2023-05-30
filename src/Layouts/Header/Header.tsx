
import { Link } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getCartItems } from "../../features/cart-slice";
import "./Header.scss";

function Header() {
  // interface DecodedT {
  //   // id:number;
  //   // email: string;
  //   // exp: number;
  //   // iat: number;
  //   // role: number
  // }
  const user = localStorage.getItem("user");
  const decoded:any  = user && decodeToken(JSON.parse(user)?.jwt);
  console.log(decoded,'d');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const data = useSelector(getCartItems);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <header className="header">
        <div className="logo">Logo</div>
        <nav className="nav-bar">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Products</a>
          <a href="#">Contact</a>
        </nav>

            {user && (
              <div className="cart-icon">
                <Link to={`/cartItem/${decoded?.id}`}>
                  cart
                </Link>
                {data.length}
              </div>
            )}
          <div className="avatar" onClick={toggleDropdown}>
            <img src="avatar.png" alt="Avatar" />
            {isDropdownOpen && (
              <div className="dropdown">
                <div className="dropdown-item">Profile</div>
                <div className="dropdown-item">Logout</div>
              </div>
            )}
          </div>
      </header>
    </div>
  );
}

export default Header;

