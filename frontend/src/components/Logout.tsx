import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/login");
  };
  return (
    <button className="btn btn-ghost rounded-lg" onClick={handleLogout}>
      <HiOutlineLogout size={20} />
    </button>
  );
}

export default Logout;
