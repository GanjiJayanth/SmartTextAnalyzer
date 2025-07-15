function Page404() {
  return (
    <main class="flex-grow flex items-center justify-center text-center">
      <div class="text-center px-4">
        <h1 class="text-4xl font-semibold text-gray-800 mb-6">
          Sorry, we couldn't find that page
        </h1>
        <p class="text-gray-600 mb-10 text-lg">
          We can't get you there from here, but here are some options that
          <br />
          might help you get back on track:
        </p>
        <ul class="space-y-5 inline-block text-left">
          <li>
            <a
              class="flex items-center text-red-500 hover:text-red-600 transition-colors"
              href="#"
            >
              <span class="material-icons mr-3">home</span>
              Go to the Homepage
            </a>
          </li>
          <li>
            <a
              class="flex items-center text-red-500 hover:text-red-600 transition-colors"
              href="#"
            >
              <span class="material-icons mr-3">arrow_back</span>
              Return to Previous Page
            </a>
          </li>
          <li>
            <a
              class="flex items-center text-red-500 hover:text-red-600 transition-colors"
              href="#"
            >
              <span class="material-icons mr-3">support_agent</span>
              Contact Support
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
}

export default Page404;
