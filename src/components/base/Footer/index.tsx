import React from 'react';

export const Footer: React.FC = () => (
  <footer className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
      <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left" />
      <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
        <div className="md:w-1/2 w-full px-4" />
        <div className="md:w-1/2 w-full px-4" />
      </div>
    </div>
    <div>
      <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row justify-center">
        <p className="text-gray-500 text-sm text-center sm:text-left">© 2023 - 2023 AZTECH</p>
      </div>
    </div>
  </footer>
);
