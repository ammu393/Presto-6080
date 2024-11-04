
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Logout({ token, setToken }) {
  const navigate = useNavigate();

  console.log('token in logout' + token);
  console.log('setTokenFn:', setToken); // Check if it's a function

  const logout = () => {
    console.log(`Bearer ${token}`);
    axios.post('http://localhost:5005/admin/auth/logout', {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
  	.then((response) => {
      console.log(response);
        localStorage.removeItem('token');
        setToken(null);
        navigate('/');
      })
      .catch((error) => {
        alert(error);
      });
  }

  return <button onClick={logout} className="bg-[#3f4d52] w-[20%] ml-6 text-white hover:bg-[#566970] py-3.5 px-5 rounded whitespace-nowrap"> 
      Log out
    </button>
}
