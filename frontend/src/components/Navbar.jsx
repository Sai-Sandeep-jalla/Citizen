import { useState } from "react";
import { Menu, X } from "lucide-react";

import apMap from "../asserts/AP map.jpg";
import indianIcon from "../asserts/Indian icon.jpg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { title: "Home", id: "home" },
    { title: "About Us", id: "about" },
    { title: "Departments", id: "departments" },
    { title: "How It Works", id: "how-it-works" },
    { title: "Contact Us", id: "contact" },
  ];

  const scrollTo = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }

    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-govt-blue-navy border-b-4 border-highlight-orange-primary shadow-lg">

      <div className="max-w-7xl mx-auto px-6">

        <div className="h-20 flex items-center justify-between">

          {/* Left Logo */}

          <div className="flex items-center gap-4 flex-shrink-0">

            <img
              src={apMap}
              alt="Andhra Pradesh Map"
              className="w-14 h-14 rounded-full bg-white p-1 object-cover"
            />

            <div>

              <h1 className="text-white text-2xl font-bold">
                Citizen Portal
              </h1>

              <p className="text-blue-200 text-sm">
                Government of Andhra Pradesh
              </p>

            </div>

          </div>

          {/* Desktop Navigation */}

          <nav className="hidden lg:flex items-center gap-8">

            {navItems.map((item) => (

              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="
                  text-white
                  font-medium
                  relative
                  transition
                  duration-300
                  hover:text-highlight-orange-primary
                  after:absolute
                  after:left-0
                  after:-bottom-1
                  after:w-0
                  after:h-[2px]
                  after:bg-highlight-orange-primary
                  hover:after:w-full
                  after:transition-all
                "
              >
                {item.title}
              </button>

            ))}

          </nav>

          {/* Right Side */}

          <div className="hidden lg:flex items-center gap-4">

            <button
              className="
                px-5
                py-2
                rounded-lg
                bg-white
                text-govt-blue-navy
                font-semibold
                hover:bg-govt-blue-soft
                transition
              "
            >
              Login
            </button>

            <button
              className="
                px-5
                py-2
                rounded-lg
                bg-highlight-orange-primary
                text-white
                font-semibold
                hover:bg-highlight-orange-dark
                transition
              "
            >
              Register
            </button>

            <img
              src={indianIcon}
              alt="Indian Emblem"
              className="w-14 h-14 rounded-full bg-white p-1 object-cover"
            />

          </div>

          {/* Mobile Menu */}

          <button
            className="lg:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>

      </div>

      {isOpen && (

        <div className="lg:hidden bg-govt-blue-navy border-t border-highlight-orange-primary">

          {navItems.map((item) => (

            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="
                block
                w-full
                text-left
                px-6
                py-4
                text-white
                hover:bg-govt-blue-royal
                transition
              "
            >
              {item.title}
            </button>

          ))}

          <div className="flex items-center gap-3 p-4">

            <button className="flex-1 py-2 rounded-lg bg-white text-govt-blue-navy font-semibold">
              Login
            </button>

            <button className="flex-1 py-2 rounded-lg bg-highlight-orange-primary text-white font-semibold">
              Register
            </button>

            <img
              src={indianIcon}
              alt="Indian Emblem"
              className="w-10 h-10 rounded-full bg-white p-1 object-cover"
            />

          </div>

        </div>

      )}

    </header>
  );
}