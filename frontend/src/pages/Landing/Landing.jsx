import NavBar from "../../components/NavBar"
export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-700 text-white">
      <NavBar></NavBar>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-b from-[#2f2f33] py-16 px-8 text-center">
        <div className="text-5xl font-extrabold text-white mb-4 mt-20 ">Make Presentations Great Again</div>
        <div className="text-xl text-gray-300 mb-8">Create stunning, easy-to-use presentations with Presto.</div>
        <a href="/login" className="bg-[#2f2f33] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-[#818182] transition duration-300 ease-in-out">
          Start Now!
        </a>
      </div>
    </div>
  );
}