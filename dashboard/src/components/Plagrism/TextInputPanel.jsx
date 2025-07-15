import "./Plagiarism.css"
function TextInputPanel({ placeholder, count }) {
  return (
    <div className="border border-gray-200 rounded-lg">
      <div className="p-4 border-b border-gray-200">
        <textarea
          className="w-full h-64 p-3 border border-gray-300 rounded-md resize-none focus:ring-blue-500 focus:border-blue-500 custom-scrollbar"
          placeholder={placeholder}
        />
        <div className="text-right text-sm text-gray-500 mt-1">{count} / 10000</div>
      </div>
    </div>
  );
}

export default TextInputPanel;
