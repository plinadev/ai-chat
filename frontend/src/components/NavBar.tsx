import logo from "../assets/logo.svg";
import Logout from "./Logout";

function NavBar() {
  return (
    <div className="navbar px-5 shadow-lg shadow-teal-600/10 flex justify-between">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Chat icon" className="w-10 h-10 opacity-90" />
        <h1 className="text-lg font-bold text-base-content">
          PDF Chat Assistant
        </h1>
      </div>
      <Logout />
    </div>
  );
}

export default NavBar;
