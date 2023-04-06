import Link from 'next/link';
import React from 'react';

export const Footer: React.FC = () => (
  <footer className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
      <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left" />
      <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
        <div className="md:w-1/2 w-full px-4">
          <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
          <nav className="list-none mb-10">
            <li>
              <Link className="text-gray-600 hover:text-gray-800" href="/">
                First Link
              </Link>
            </li>
          </nav>
        </div>
        <div className="md:w-1/2 w-full px-4">
          <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">TAGS</h2>
          <nav className="list-none mb-10">
            <li>
              <Link className="text-gray-600 hover:text-gray-800" href="/">
                First Link
              </Link>
            </li>
          </nav>
        </div>
      </div>
    </div>
    <div>
      <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row justify-center">
        <p className="text-gray-500 text-sm text-center sm:text-left">© 2023 AZTech</p>
      </div>
    </div>
  </footer>
);
