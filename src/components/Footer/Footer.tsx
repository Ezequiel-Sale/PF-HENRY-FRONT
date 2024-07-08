const Footer = () => {
  return (
    <footer className="bg-black text-white border-t-2 border-red-700 shadow-lg">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <img
                src="logo-with-name.png"
                className="h-8 me-3"
                alt="Power Training logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-red-600">
                Power Training
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">
                Recursos
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="/" className="hover:underline">
                    Power Training™
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Tailwind CSS
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">
                Siguenos
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/Ezequiel-Sale/PF-HENRY-FRONT"
                    className="hover:underline"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/t2VeRbRB"
                    className="hover:underline"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">
                Legal
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Politica de privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terminos &amp; Condiciones
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2024{" "}
            <a href="/" className="hover:underline">
              Power Training™
            </a>
            . Todos los derechos reservados.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 21 16"
              >
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
              </svg>
              <span className="sr-only">Discord community</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 17"
              >
                <path
                  fillRule="evenodd"
                  d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Twitter page</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878V12.89H5.898v-2.89h2.54V7.797c0-2.507 1.492-3.89 3.777-3.89 1.095 0 2.24.195 2.24.195v2.48h-1.262c-1.244 0-1.63.772-1.63 1.562V10h2.773l-.443 2.889h-2.33v6.988C16.343 19.128 20 14.991 20 10 20 4.477 15.523 0 10 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 1.222A8.778 8.778 0 1 0 18.778 10 8.787 8.787 0 0 0 10 1.222Zm0 16A7.222 7.222 0 1 1 17.222 10 7.23 7.23 0 0 1 10 17.222ZM13.158 10a3.158 3.158 0 1 1-6.316 0 3.158 3.158 0 0 1 6.316 0Zm1.781-4.444a.739.739 0 1 1-.739-.739.739.739 0 0 1 .739.739ZM10 7.162A2.845 2.845 0 1 0 12.845 10 2.848 2.848 0 0 0 10 7.162Zm0 5.055A2.21 2.21 0 1 1 12.21 10 2.213 2.213 0 0 1 10 12.217Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Instagram page</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0Zm0 18.625A8.625 8.625 0 1 1 18.625 10 8.635 8.635 0 0 1 10 18.625Zm4.495-12.833a.946.946 0 1 1-.946-.947.946.946 0 0 1 .946.947ZM7.65 10c0-1.295.895-2.35 2.35-2.35 1.295 0 2.35.895 2.35 2.35 0 1.295-.895 2.35-2.35 2.35-1.295 0-2.35-.895-2.35-2.35Zm4.68 0c0-1.295-.895-2.35-2.35-2.35-1.295 0-2.35.895-2.35 2.35 0 1.295.895 2.35 2.35 2.35 1.295 0 2.35-.895 2.35-2.35Zm-1.225 4.68H8.942A5.107 5.107 0 0 1 6.66 15a.674.674 0 0 1-.616-.447 2.256 2.256 0 0 1-.15-1.282c.112-.267.228-.529.35-.783.234-.478.473-.932.74-1.389a5.377 5.377 0 0 1 1.084-1.213A4.857 4.857 0 0 1 10 9.223a4.857 4.857 0 0 1 2.932 1.014 5.108 5.108 0 0 1 1.68 2.22c.12.263.239.528.35.783.13.355.226.723.273 1.098a2.256 2.256 0 0 1-.15 1.282.674.674 0 0 1-.616.447 5.105 5.105 0 0 1-1.732.68ZM10 8.25c-1.295 0-2.35.895-2.35 2.35 0 1.295.895 2.35 2.35 2.35 1.295 0 2.35-.895 2.35-2.35 0-1.295-.895-2.35-2.35-2.35Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">LinkedIn page</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
