import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { isAuthenticated, user } = useAuthStore();
  // Authentication state

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 bg-black text-white backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">Code Battleground</span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            <li>
              <Link to="/" className="hover:text-orange-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-orange-500">
                Problems
              </Link>
            </li>
            <li>
              <Link to="/quizzes" className="hover:text-orange-500">
                Quizzes
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-orange-500">
                LeaderBoard
              </Link>
            </li>
          
           
          </ul>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            {isAuthenticated ? (
             <Link
             to="/dashboard"
             className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
           >
             Dashboard
           </Link>

              
            ) : (
              <>
                <Link to="/login" className="py-2 px-3 border rounded-md text-white hover:bg-neutral-800">
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
                >
                  Create an account
                </Link>
              </>
            )}
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X className="text-white" /> : <Menu className="text-white" />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20c text-white bg-black w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul className="p-4">
              <li>
                <Link to="/" className="py-4 hover:text-orange-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="py-4 hover:text-orange-500">
                  Problems
                </Link>
              </li>
              <li>
                <Link to="/" className="py-4 hover:text-orange-500">
                  Quizzes
                </Link>
              </li>
              <li>
                <Link to="/" className="py-4 hover:text-orange-500">
                  LeaderBoard
                </Link>
              </li>
              {/* Mobile Dashboard link visible only if authenticated */}
              {isAuthenticated && (
                <li>
                  <Link to="/dashboard" className="py-4 hover:text-orange-500">
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>
            <div className="flex space-x-6">
              {isAuthenticated ? (
                <Link to="/logout" className="py-2 px-3 border rounded-md">
                  Logout
                </Link>
              ) : (
                <>
                  <Link to="/login" className="py-2 px-3 border rounded-md">
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
                  >
                    Create an account
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
