import React from "react";
import { Link } from "react-router-dom";

/* Custom Icons */
import { ReactComponent as IconSearch } from "../assets/ico-search.svg";
import { ReactComponent as IconProfile } from "../assets/ico-profile.svg";
import "./Navbar.css"; // Include the CSS file

const Navbar = (props) => {
  const user = {
    name: "User Name",
    email: "user@example.com",
    picture: "http://52.78.204.238/image/profileDefaultImg.jpg",
  };

  const userImage = user.picture === "http://52.78.204.238/image/profileDefaultImg.jpg" ? <IconProfile /> : user.picture;

  return (
    <header className="header" id="header">
      <div className="container-fluid">
        <div className="row">
          <div className="col header-right">
            <Link to="/" className="sidebar-logo">
              {/* <Logo className="logo" /> */}
            </Link>

            {/* Search Group */}
            <div className="search-group">
              <div className="input-group">
                <div className="search-select-group">
                  <select className="search-select-box" defaultValue="all">
                    <option value="all">전체</option>
                    <option value="bookmark">북마크 검색</option>
                    <option value="mynote">내가 작성한 문서 검색</option>
                  </select>
                </div>

                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="form-control"
                />
                <button className="btn-search">
                  <IconSearch width="24" height="24" fill="#767676" />
                </button>
              </div>
            </div>

            {/* User Profile */}
            <div className="header-dropdown">
              <div className="dropdown-toggle">
                <img src={userImage} alt="profileImage" className="dropdown-profile" />
              </div>

              <div className="dropdown-group">
                <div className="text-center">
                  <img
                    src={userImage}
                    alt="profileImage"
                    style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                    className="dropdown-profile"
                  />
                  <p className="dropdown-name">{user.name}</p>
                  <p className="dropdown-email">{user.email}</p>
                </div>
                <div className="dropdown-divider" />
                <div>
                  <button className="btn-logout">로그아웃</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;