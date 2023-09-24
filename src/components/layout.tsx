// components/Layout.js

import Navbar from "./core/Navbar";

export const Layout = ({ children }: { children: any }) => {
  return (
    <div className="min-h-screen bg-[#18181a]">
      <header className="bg-white shadow">
        <nav className="container mx-auto max-w-7xl px-4 py-2 bg-[#1b1b1f] border-b border-[#2e3037]">
          {/* Place your Navbar components or links here */}
          <Navbar />
        </nav>
      </header>

      <main className="container mx-auto max-w-7xl px-4 mt-6">{children}</main>
    </div>
  );
};
