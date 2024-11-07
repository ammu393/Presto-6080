


export default function NavBar() {
  return (
    <div className="bg-gradient-to-r from-navBar-purple-start from-30% via-navBar-purple-end via-70% to-navBar-purple-end to-60%  h-14 flex justify-end items-center mr-auto">
      <div className="inline-block h-10 min-h-[1em] w-0.5 bg-white/10"></div>   
      <a href="/login" className="bg-navBar-purple-end hover:bg-navBar-purple-start text-white font-bold py-2 px-4 rounded mx-2">
        Log in 
      </a>  
      <a href="/register" className="bg-white text-navBar-purple-start font-bold py-2 px-4 rounded whitespace-nowrap mx-3 ">
        Sign up 
      </a>  
    </div>
  )
}