export function PresentationSideBarItem({ text, icon, onClick }) {
  return (
    <li>
      <a href="#" className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group" onClick={onClick}>
        <img src={icon} className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-100 dark:group-hover:text-white"></img>
        <span className="ms-3">{text}</span>
      </a>
    </li>
  )
}