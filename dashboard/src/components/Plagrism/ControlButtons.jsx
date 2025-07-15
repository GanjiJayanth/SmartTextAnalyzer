
function ControlButtons() {
  const icons = ["content_copy", "delete", "settings", "fullscreen"];
  return (
    <div className="absolute top-2 right-2 flex flex-col space-y-2">
      {icons.map((icon, i) => (
        <button key={i} className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none">
          <span className="material-icons text-xl">{icon}</span>
        </button>
      ))}
    </div>
  );
}

export default ControlButtons;
