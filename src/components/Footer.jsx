import "../styles/Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__credit">
        Designed &amp; built with care by{" "}
        <a
          href="https://github.com/BirukL137"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Biruk Lemma on GitHub"
        >
          Biruk Lemma
        </a>{" "}
        <span aria-hidden="true">🌿</span>
        <span className="footer__sep">•</span> © {year}
      </p>
    </footer>
  );
};

export default Footer;
