import { Link } from "react-router-dom";
function Dashboard() {
  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Documents</h1>
          <div className="flex items-center space-x-4">
            <Link className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600 flex items-center" to="/dashboard/editor">
              <span className="material-icons mr-2 text-sm">add</span>
              New document
            </Link>
            <Link className="bg-white text-gray-700 px-4 py-2 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50 flex items-center "to="/dashboard/upload">
              <span className="material-icons mr-2 text-sm text-gray-500">
                upload_file
              </span>
              Upload file
            </Link>
          </div>
          <div className="relative">
            <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              search
            </span>
            <input
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 w-64 text-sm"
              placeholder="Search..."
              type="text"
            />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">Today</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500">27 Jun</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1 truncate">
                aimlexam
              </h4>
              <p className="text-xs text-gray-600 mb-4 h-8 overflow-hidden">
                We're sorry, but an unexpected error occurred while processing
                your...
              </p>
              <div className="flex items-center justify-between text-gray-500">
                <div className="flex items-center space-x-1">
                  <span className="material-icons text-red-500 text-base">
                    error_outline
                  </span>
                  <span className="text-xs text-red-500 font-medium">3</span>
                </div>
                <div className="flex space-x-2">
                  <button className="hover:text-green-500">
                    <span className="material-icons text-lg">download</span>
                  </button>
                  <button className="hover:text-green-500">
                    <span className="material-icons text-lg">content_copy</span>
                  </button>
                  <button className="hover:text-red-500">
                    <span className="material-icons text-lg">delete_outline</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500">27 Jun</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1 truncate">
                rfvewfeeeeeeeee...
              </h4>
              <p className="text-xs text-gray-600 mb-4 h-8 overflow-hidden">
                rfvewfeeeeeeeeeeeeeeeeeeeee...
              </p>
              <div className="flex items-center justify-between text-gray-500">
                <div className="flex items-center space-x-1">
                  <span className="material-icons text-red-500 text-base">
                    error_outline
                  </span>
                  <span className="text-xs text-red-500 font-medium">1</span>
                </div>
                <div className="flex space-x-2">
                  <button className="hover:text-green-500">
                    <span className="material-icons text-lg">download</span>
                  </button>
                  <button className="hover:text-green-500">
                    <span className="material-icons text-lg">content_copy</span>
                  </button>
                  <button className="hover:text-red-500">
                    <span className="material-icons text-lg">delete_outline</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Earlier</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500">7 Jun</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1 truncate">
                Demo document
              </h4>
              <p className="text-xs text-gray-600 mb-4 h-8 overflow-hidden">
                The basics Misspellings and grammatical errors can effect
                your...
              </p>
              <div className="flex items-center justify-between text-gray-500">
                <div className="flex items-center space-x-1">
                  <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-100 text-red-600 text-xs font-bold">
                    23
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="hover:text-green-500">
                    <span className="material-icons text-lg">download</span>
                  </button>
                  <button className="hover:text-green-500">
                    <span className="material-icons text-lg">content_copy</span>
                  </button>
                  <button className="hover:text-red-500">
                    <span className="material-icons text-lg">delete_outline</span>
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
