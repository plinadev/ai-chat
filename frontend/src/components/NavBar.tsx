import logo from "../assets/logo.svg";

function NavBar() {
  return (
    <div className="navbar shadow-lg shadow-teal-600/10">
      <div className="flex pl-5 items-center gap-3">
        <img src={logo} alt="Chat icon" className="w-10 h-10 opacity-90" />
        <h1 className="text-lg font-bold text-base-content">
          PDF Chat Assistant
        </h1>
      </div>
    </div>
  );
}

export default NavBar;
