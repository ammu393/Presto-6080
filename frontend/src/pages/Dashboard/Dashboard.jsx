import Logout from "../../Logout"
export default function Dashboard( {token, setToken } ) {
  return (
    <>
      <Logout token = {token} setToken={setToken} ></Logout>
      <h1 className="text-3xl font-bold underline">dashboard</h1>
    </>
  )
}