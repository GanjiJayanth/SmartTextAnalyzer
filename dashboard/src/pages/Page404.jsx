import { Link } from "react-router-dom";

function Page404() {
  return (
    <main className="min-h-screen flex items-center justify-center text-center">
      <div className="text-center px-4">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">
          Sorry, we couldn't find that page
        </h1>
        <p className="text-gray-600 mb-10 text-lg">
          We can't get you there from here, but here are some options that
          <br />
          might help you get back on track:
        </p>
        <ul className="space-y-5 inline-block text-left">
          <li>
            <Link
              className="flex items-center text-red-500 hover:text-red-600 transition-colors"
              to="/"
            >
              <span className="material-icons mr-3">home</span>
              Go to the Homepage
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center text-red-500 hover:text-red-600 transition-colors"
              to="/"
            >
              <span className="material-icons mr-3">arrow_back</span>
              Return to Previous Page
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center text-red-500 hover:text-red-600 transition-colors"
              to="/"
            >
              <span className="material-icons mr-3">support_agent</span>
              Contact Support
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}

export default Page404;