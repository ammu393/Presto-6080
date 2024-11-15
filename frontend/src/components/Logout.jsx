import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Logout({ token, setToken, position }) {
  const navigate = useNavigate();
  let style = "bg-transparent hover:bg-zinc-700 text-white font-semibold hover:text-white py-2 px-4 rounded whitespace-nowrap";

  if (position) {
    style = "bg-[#2f2f33] hover:bg-zinc-700 text-white font-semibold hover:text-white py-2 px-4 rounded whitespace-nowrap";
  }

  const logout = () => {
    axios
      .post(
        'http://localhost:5005/admin/auth/logout',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/');
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <button
      onClick={logout}
      className={style}
      style={position ? position : {}}
    >
      Log out
    </button>
  );
}
