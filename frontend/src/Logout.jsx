
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Logout({ token, setToken}) {
    const navigate = useNavigate();
    const logout = () => {
        axios.post('http://localhost:5005/admin/auth/logout', {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(function (response) {
            localStorage.removeItem('token');
            setToken(null);
            navigate('/');
        })
        .catch( function(error) {
            alert(error.response.data.error);
        });
    }

    return (
<button onClick={logout} className="bg-[#3f4d52] w-[20%] ml-6 text-white hover:bg-[#566970] py-3.5 px-5 rounded whitespace-nowrap">
                Log out
        </button>     )
}