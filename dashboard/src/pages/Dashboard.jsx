import { Link } from "react-router-dom";
function Dashboard() {
  return (
    <main class="flex-1 p-8 overflow-y-auto">
      <div>
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-2xl font-semibold text-gray-800">Documents</h1>
          <div class="flex items-center space-x-4">
            <Link class="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600 flex items-center" to="/dashboard/editor">
              <span class="material-icons mr-2 text-sm">add</span>
              New document
            </Link>
            <Link class="bg-white text-gray-700 px-4 py-2 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50 flex items-center "to="/dashboard/upload">
              <span class="material-icons mr-2 text-sm text-gray-500">
                upload_file
              </span>
              Upload file
            </Link>
          </div>
          <div class="relative">
            <span class="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              search
            </span>
            <input
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 w-64 text-sm"
              placeholder="Search..."
              type="text"
            />
          </div>
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-500 mb-4">Today</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div class="flex justify-between items-center mb-1">
                <span class="text-xs text-gray-500">27 Jun</span>
              </div>
              <h4 class="font-semibold text-gray-800 mb-1 truncate">
                aimlexam
              </h4>
              <p class="text-xs text-gray-600 mb-4 h-8 overflow-hidden">
                We're sorry, but an unexpected error occurred while processing
                your...
              </p>
              <div class="flex items-center justify-between text-gray-500">
                <div class="flex items-center space-x-1">
                  <span class="material-icons text-red-500 text-base">
                    error_outline
                  </span>
                  <span class="text-xs text-red-500 font-medium">3</span>
                </div>
                <div class="flex space-x-2">
                  <button class="hover:text-green-500">
                    <span class="material-icons text-lg">download</span>
                  </button>
                  <button class="hover:text-green-500">
                    <span class="material-icons text-lg">content_copy</span>
                  </button>
                  <button class="hover:text-red-500">
                    <span class="material-icons text-lg">delete_outline</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div class="flex justify-between items-center mb-1">
                <span class="text-xs text-gray-500">27 Jun</span>
              </div>
              <h4 class="font-semibold text-gray-800 mb-1 truncate">
                rfvewfeeeeeeeee...
              </h4>
              <p class="text-xs text-gray-600 mb-4 h-8 overflow-hidden">
                rfvewfeeeeeeeeeeeeeeeeeeeee...
              </p>
              <div class="flex items-center justify-between text-gray-500">
                <div class="flex items-center space-x-1">
                  <span class="material-icons text-red-500 text-base">
                    error_outline
                  </span>
                  <span class="text-xs text-red-500 font-medium">1</span>
                </div>
                <div class="flex space-x-2">
                  <button class="hover:text-green-500">
                    <span class="material-icons text-lg">download</span>
                  </button>
                  <button class="hover:text-green-500">
                    <span class="material-icons text-lg">content_copy</span>
                  </button>
                  <button class="hover:text-red-500">
                    <span class="material-icons text-lg">delete_outline</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-8">
          <h3 class="text-sm font-medium text-gray-500 mb-4">Earlier</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div class="flex justify-between items-center mb-1">
                <span class="text-xs text-gray-500">7 Jun</span>
              </div>
              <h4 class="font-semibold text-gray-800 mb-1 truncate">
                Demo document
              </h4>
              <p class="text-xs text-gray-600 mb-4 h-8 overflow-hidden">
                The basics Misspellings and grammatical errors can effect
                your...
              </p>
              <div class="flex items-center justify-between text-gray-500">
                <div class="flex items-center space-x-1">
                  <span class="inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-100 text-red-600 text-xs font-bold">
                    23
                  </span>
                </div>
                <div class="flex space-x-2">
                  <button class="hover:text-green-500">
                    <span class="material-icons text-lg">download</span>
                  </button>
                  <button class="hover:text-green-500">
                    <span class="material-icons text-lg">content_copy</span>
                  </button>
                  <button class="hover:text-red-500">
                    <span class="material-icons text-lg">delete_outline</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
