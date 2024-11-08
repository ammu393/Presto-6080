export default function PresentationToolBarItem({ icon, text, onClick }) {
  return (
    <li>
      <a href="#" className="flex flex-col items-center p-2 text-white rounded-lg hover:bg-gray-700 group" onClick={onClick}>
        <img src={icon} alt="Text Icon" className="w-8 h-8 text-gray-500 transition duration-75 group-hover:text-gray-100" />
        <span>{text}</span>
      </a>
    </li>
  )
}