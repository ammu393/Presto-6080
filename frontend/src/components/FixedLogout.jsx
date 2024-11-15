import Logout from "./Logout";

export default function FixedLogout({token, setToken}) {
  const position = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: '10',
  };

  return (
    <>
      <Logout token={token} setToken={setToken} position={position}/>
    </>
  )
}