import { useContext } from "react";
import "../styles/Header.css";
import { Sun, Moon } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <div className="header__wrapper">
        <h1 className="header__title">Where in the world?</h1>
        <button
          className="header__toggle"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
        >
          <span className="header__toggle-icon" aria-hidden="true">
            {/* 🌙 */}
            {theme === "dark" ? <Sun fill="yellow" /> : <Moon />}
          </span>
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
