import React from "react";

const Footer = () => {
  const currentDate = new Date(Date.now());
  const currentYear = currentDate.getFullYear();
  return (
    <footer>
      <h4>www.ultimate.mn</h4>
      <h4>Ultimate LLC @copyright {currentYear}</h4>
    </footer>
  );
};

export default Footer;
