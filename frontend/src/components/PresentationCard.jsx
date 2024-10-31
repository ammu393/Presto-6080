export function PresentationCard() {
  return (
    <div className="bg-white aspect-[2/1] max-w-lg flex flex-col p-4">
      <div className="w-full h-3/4 bg-gray-300 mb-2 flex items-center justify-center">
        <span className="text-sm text-gray-500">No Thumbnail</span>
      </div>
      <h3 className="text-lg font-semibold mb-1">Presentation Name</h3>
      <p className="text-sm text-gray-600 mb-1">Description</p>
      <span className="text-xs text-gray-500">Slides</span>
    </div>
  )
}