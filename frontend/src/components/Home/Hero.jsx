import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="h-[80vh] flex flex-col lg:flex-row items-center justify-between px-10 max-w-[1200px] mx-auto mb-16">
      
      {/* Left - Text Section */}
      <div className="lg:w-1/2 flex flex-col items-center lg:items-start justify-center">
        <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left leading-tight">
          Discover the book of your choice.
        </h1>
        <p className="mt-4 text-lg lg:text-xl text-zinc-300 text-center lg:text-left">
          Embark on a journey through captivating tales, boundless wisdom, and limitless inspiration—where every page turns into an adventure waiting to be discovered.
        </p>
        <div className="mt-6">
          <Link to="/all-books" className="text-yellow-100 text-lg lg:text-2xl font-semibold border border-yellow-100 px-8 py-3 hover:bg-zinc-800 rounded-md">
            Discover Books
          </Link>
        </div>
      </div>

      {/* Right - Image Section */}
      <div className="lg:w-1/2 flex justify-center items-center">
        <img src="./hero.jpg" alt="hero" className="w-full h-auto object-cover max-w-full rounded-lg shadow-lg" />
      </div>
      
    </div>
  );
};

export default Hero;
