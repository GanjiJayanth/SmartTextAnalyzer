import { Link } from "react-router-dom";
function WriteAISidebar() {
  return (
    <aside class="w-96 bg-white border-l border-gray-200 flex flex-col">
      <div class="p-4 border-b border-gray-200">
        <div class="flex justify-around">
           <Link className="flex flex-col items-center  text-gray-500 hover:text-gray-700 py-2 px-3"  to="/dashboard/editor">
            <span className="material-icons text-xl">edit_note</span>
            <span className="text-xs mt-1">Review suggestions</span>
          </Link>
          <Link className="flex flex-col items-center text-purple-600 border-b-2 border-purple-600 py-2 px-3"  to="/dashboard/editor/generativeAI">
            <span className="material-icons text-xl">auto_awesome</span>
            <span className="text-xs mt-1">Write with generative AI</span>
          </Link>
          <Link className="flex flex-col items-center text-gray-500 hover:text-gray-700 py-2 px-3"  to="/dashboard/editor/plagiarism">
            <span className="material-icons text-xl">plagiarism</span>
            <span className="text-xs mt-1">Check for AI text &amp; plagiarism</span>
          </Link>
        </div>
      </div>
      <div class="p-4 flex-grow overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-sm font-medium text-gray-800">
            Write with generative AI
          </h2>
          <button class="text-gray-500 hover:text-gray-700">
            <span class="material-icons text-base">help_outline</span>
          </button>
        </div>
        <div class="mb-4">
          <label
            class="block text-xs font-medium text-gray-700 mb-1"
            for="prompt"
          >
            Prompt
          </label>
          <textarea
            class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-purple-500 focus:border-purple-500"
            id="prompt"
            name="prompt"
            placeholder="e.g., Write a paragraph about the future of AI"
            rows="3"
          ></textarea>
        </div>
        <div class="mb-4">
          <label
            class="block text-xs font-medium text-gray-700 mb-1"
            for="tone"
          >
            Tone
          </label>
          <select
            class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-purple-500 focus:border-purple-500"
            id="tone"
            name="tone"
          >
            <option>Casual</option>
            <option>Formal</option>
            <option>Professional</option>
            <option>Enthusiastic</option>
            <option>Skeptical</option>
          </select>
        </div>
        <div class="mb-6">
          <button class="w-full bg-purple-600 text-white text-sm py-2 px-4 rounded-md hover:bg-purple-700 flex items-center justify-center">
            <span class="material-icons text-base mr-2">auto_awesome</span>
            Generate text
          </button>
        </div>
        <div class="border border-gray-200 rounded-lg p-3">
          <div class="flex items-center text-xs text-gray-600 mb-2">
            <span class="material-icons text-base mr-1 text-purple-500">
              lightbulb
            </span>
            <span>Generated Text</span>
            <button class="text-gray-400 hover:text-gray-600 ml-auto">
              <span class="material-icons text-base">more_vert</span>
            </button>
          </div>
          <p class="text-sm text-gray-700 mb-3 bg-gray-50 p-2 rounded-md">
            The future of artificial intelligence is incredibly promising, with
            potential to revolutionize industries from healthcare to
            transportation. As algorithms become more sophisticated and data
            more abundant, AI systems will likely achieve human-level or even
            superhuman capabilities in various domains...
          </p>
          <div class="flex items-center space-x-2">
            <button class="bg-teal-500 text-white text-xs px-3 py-1.5 rounded-md hover:bg-teal-600">
              Insert
            </button>
            <button class="text-gray-500 text-xs hover:text-gray-700">
              Regenerate
            </button>
            <button class="text-gray-400 hover:text-gray-600 ml-auto">
              <span class="material-icons text-base">content_copy</span>
            </button>
          </div>
        </div>
      </div>
      <div class="p-4 border-t border-gray-200">
        <button class="flex items-center text-sm text-gray-600 hover:text-gray-800 w-full">
          <span class="material-icons text-base mr-2">settings</span>
          Adjust generation settings
          <span class="material-icons text-gray-400 text-base ml-auto">
            chevron_right
          </span>
        </button>
      </div>
    </aside>
  );
}

export default WriteAISidebar;
