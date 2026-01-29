import React from 'react';

// Captured at build time
const BUILD_TIME = new Date().toISOString();

const Footer = () => {
  const formattedDate = new Date(BUILD_TIME).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <footer className="text-center mt-12 pb-8 text-gray-300">
      <hr className="border-gray-500 pb-0 pt-8" />
      <p className="mt-4">
        <a
          className="underline"
          href="https://github.com/petermekhaeil/page-speed-insights"
        >
          Source code
        </a>
      </p>
      <p className="mt-2 text-sm text-gray-300">
        Last updated: {formattedDate}
      </p>
    </footer>
  );
};

export default Footer;
