


export default function NavBar() {
  return (
    <div className="bg-[#2f2f33] h-16 flex justify-between items-center px-6 shadow-md">
      {/* Logo or Brand Name */}
      <a href="/" className="text-2xl font-bold text-white">
        Presto
      </a>
      {/* Navigation Links */}
      <div className="flex space-x-4">
        <a href="/login" className="bg-[#2f2f33] hover:bg-[#818182] text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out">
          Log in
        </a>
        <a href="/register" className="bg-white text-[#2f2f33] font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out hover:bg-[#f0f0f0]">
          Sign up
        </a>
      </div>
    </div>
  )
}