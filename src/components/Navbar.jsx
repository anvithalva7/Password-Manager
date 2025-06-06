import React from 'react'
import { FaGithub } from 'react-icons/fa'; 


const Navbar = () => {
  return (
    <div className='mb-5'>
      <div className="navbar bg-gray-800 text-white p-4 flex justify-around items-center">
        <div className="logo text-2xl cursor-pointer"><span className='text-green-600 font-medium'>&lt;</span>
          <span>For</span>
          <span className='text-green-600 font-medium'>Ever/&gt;</span>
          </div>
        <div className="links flex gap-4">
          <a href="/" className="hover:text-green-300 cursor-pointer">Home</a>
          <a href="/" className="hover:text-green-300 cursor-pointer">About</a>
          <a href="/" className="hover:text-green-300 cursor-pointer">Contact</a>
        </div>
        <div className="git hover:text-green-300 cursor-pointer">
        <a 
          href="https://github.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded flex items-center gap-2 ring-white ring-1"
        >
          <FaGithub size={20} /> GitHub
        </a>
        </div>
      </div>
    </div>
  )
}

export default Navbar
