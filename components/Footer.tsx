import React from 'react';
import { topics } from '../config';

const Footer = () => {
  return (
    <footer className="text-center mt-12 pb-8 text-gray-300">
      <hr className="border-gray-500 pb-0 pt-8" />
      {Object.keys(topics).map((topic, index) => {
        return (
          <li className="ml-2 mr-2 list-none" key={index}>
            <a className="underline" href={topics[topic].url}>
              {topics[topic].title}
            </a>
          </li>
        );
      })}
      <p className="mt-4">
        <a
          className="underline"
          href="https://github.com/petermekhaeil/page-speed-insights"
        >
          Source code
        </a>
      </p>
    </footer>
  );
};

export default Footer;
