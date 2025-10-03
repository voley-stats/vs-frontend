import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-light dark:bg-black">
      <Sidebar />
      <div className="ml-64 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default Layout;
