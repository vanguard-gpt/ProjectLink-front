import React from "react";
import { Link } from "react-router-dom";

/* Custom Icons */
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as IconBookMark } from "../assets/ico-bookmark.svg";
import { ReactComponent as IconFile } from "../assets/ico-file.svg";
import { ReactComponent as IconProject } from "../assets/ico-project.svg";
import "./Sidebar.css"; // Include the CSS file

const Sidebar = React.memo((props) => {
  return (
    <nav className="sidebar">
      {/* Logo */}
      <div className="logo-group">
        <div className="container-fluid">
          <Link to="/" className="sidebar-logo">
            <Logo className="logo" />
          </Link>
        </div>
      </div>

      {/* Menu */}
      <div className="menu-group">
        <div className="container-fluid">
          <ul className="menu">
            <li className="menu-item">
              <Link to="/bookmark" className="menu-link">
                <IconBookMark className="menu-icon" width="20px" height="20px" />
                <span className="menu-text">북마크</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/mynote" className="menu-link">
                <IconFile className="menu-icon" width="20px" height="20px" />
                <span className="menu-text">내가 작성한 문서</span>
              </Link>
            </li>
            <li className="menu-item">
              <div className="accordion my-project-group">
                <div className="accordion-item">
                  <div className="accordion-header">
                    <IconProject width="40" height="40" fill="#9A9A9A" className="menu-icon" />
                    <span className="menu-text">내 프로젝트 보기</span>
                  </div>
                  <div className="accordion-body" style={{ marginLeft: "18px", paddingTop: "0px" }}>
                    {/* ProjectList Component would go here */}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
});

export default Sidebar;