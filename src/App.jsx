import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CountryDetail from "./pages/CountryDetail";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:code" element={<CountryDetail />} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
};

export default App;
