import { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import gsap from "gsap";
import MoodTrackerContext from "../../context/MoodTrackerContext";

import "./index.css";

class Header extends Component {
  state = { isMenu: false, isDarkTheme: false };
  componentDidMount() {
    gsap.to(".dark-theme-button", { rotate: 360, duration: 1 });
  }

  onMenuClick = () => {
    this.setState((prev) => ({ isMenu: !prev.isMenu }));
  };

  onLogout = () => {
    Cookies.remove("jwt_token");
    window.location.replace("/login");
  };

  render() {
    const { isMenu } = this.state;

    const newClassName = isMenu ? "navbar-menu" : "nav-content-lg";
    const newDataTestid = isMenu ? "navbarMenu" : "navContentLg";

    return (
      <MoodTrackerContext.Consumer>
        {(value) => {
          const { onHomeClick, onReportClick, setIsDarkTheme, isDarkTheme } =
            value;
          const navLightTheme = isDarkTheme ? "nav-light-theme" : "";
          return (
            <>
              <nav data-testid="navbar" className={`navbar ${navLightTheme}`}>
                <h1 data-testid="navHeading" className="nav-heading">
                  Daily Mood Tracker
                </h1>
                <div data-testid="navContentSm" className="nav-content-sm">
                  <button
                    className="menu-button"
                    type="button"
                    onClick={this.onMenuClick}
                    data-testid="menuButton"
                  >
                    {isMenu ? (
                      <MdClose className="icon" />
                    ) : (
                      <FiMenu className="icon" />
                    )}
                  </button>
                </div>
                <div data-testid={newDataTestid} className={newClassName}>
                  <ul
                    data-testid="navbarMenuContent"
                    className="navbar-menu-content"
                  >
                    <Link onClick={onHomeClick} className="link" to="/">
                      <li
                        data-testid="navLi"
                        className={`nav-li ${isDarkTheme && "nav-li-dark"}`}
                      >
                        Home
                      </li>
                    </Link>
                    <Link
                      onClick={onReportClick}
                      className="link"
                      to="/reports"
                    >
                      <li
                        data-testid="navLi2"
                        className={`nav-li ${isDarkTheme && "nav-li-dark"}`}
                      >
                        Reports
                      </li>
                    </Link>
                    <li>
                      <button
                        type="button"
                        onClick={this.onLogout}
                        className="logout-button"
                        data-testid="logoutButton"
                      >
                        Logout
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="dark-theme-button"
                        onClick={() => {
                          setIsDarkTheme();
                        }}
                      >
                        <img
                          src={
                            isDarkTheme
                              ? "https://assets.ccbp.in/frontend/react-js/dark-theme-img.png"
                              : "https://assets.ccbp.in/frontend/react-js/light-theme-img.png"
                          }
                          alt="light-theme"
                        />
                      </button>
                    </li>
                  </ul>
                </div>
              </nav>
            </>
          );
        }}
      </MoodTrackerContext.Consumer>
    );
  }
}

export default Header;
