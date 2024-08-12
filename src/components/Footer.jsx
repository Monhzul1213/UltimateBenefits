export const Footer = () => {
  const currentDate = new Date(Date.now());
  const currentYear = currentDate.getFullYear();
  return (
    <footer>
      <a
        style={{ color: "white" }}
        href="http://ultimate.mn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h4>www.ultimate.mn</h4>
      </a>
      <h4>Ultimate LLC @copyright {currentYear}</h4>
    </footer>
  );
};
