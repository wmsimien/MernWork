import React from 'react';

let Footer = () => {
  return (
    // JSX - Javascript like XML structure(not html, not xml; but, js)
    <footer className={'footer'}>
      <p className={'copyright'}>
        &copy; Copyright {new Date().getFullYear()} by SimTechs Inc.
      </p>
    </footer>
  );
};

export default Footer;
