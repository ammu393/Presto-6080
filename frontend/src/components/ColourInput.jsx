export default function ColourInput({colour, setColour, text}) {
  return (
    <>
      <label className="block text-lg font-medium mb-2">{text}</label>
      <input
        type="color"
        value={colour}
        onChange={(e) => setColour(e.target.value)}
        className="border p-2 w-12 h-12 mb-4"
      />
    </>
  )
}