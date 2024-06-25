import React from 'react';

const Login = () => {
  return (
    <div 
    className="flex justify-center items-center min-h-screen bg-cover bg-center"
    style={{backgroundImage: "url('/gym.jpeg')"}}
    >
      <div className="w-full max-w-sm p-4 bg-black border border-gray-800 rounded-lg shadow sm:p-6 md:p-8">
        <form className="space-y-6" action="#">
          <h5 className="text-xl font-medium text-white">Sign in to our platform</h5>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
            <input type="email" name="email" id="email" className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" placeholder="name@company.com" required />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Your password</label>
            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" required />
          </div>
          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-700 rounded bg-gray-900 focus:ring-3 focus:ring-red-300" required />
              </div>
              <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-300">Remember me</label>
            </div>
            <a href="#" className="ms-auto text-sm text-red-500 hover:underline">Lost Password?</a>
          </div>
          <button type="submit" className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login to your account</button>
          <div className="text-sm font-medium text-gray-300">
            Not registered? <a href="#" className="text-red-500 hover:underline">Create account</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login