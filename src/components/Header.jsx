import { useContext } from "react";
import "./Header.css";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <div className="header__wrapper">
        <h1 className="header__title">Where in the world?</h1>
        <button
          className="header__theme-button"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
        >
          <span className="header__icon" aria-hidden="true">
            🌙
          </span>
          <span>Dark Mode</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
