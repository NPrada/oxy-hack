// components/Layout.js
import Image from "next/image";
import bg from "../../public/assets/backgound.jpeg";
import Navbar from "./core/Navbar";

export const Layout = ({ children }: { children: any }) => {
  return (
    <div
      className="min-h-screen bg-[#18181a] bg-center bg-cover"
      style={{ backgroundImage: `url(${bg.src})`, objectFit: "contain" }}
    >
      <header className="">
        <nav className="container mx-auto max-w-7xl px-4 py-2">
          {/* Place your Navbar components or links here */}
          <Navbar />
        </nav>
      </header>

      <main className="container mx-auto max-w-7xl px-4 mt-6">{children}</main>
    </div>
  );
};
