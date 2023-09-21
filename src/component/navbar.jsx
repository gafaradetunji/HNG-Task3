import { useState } from 'react'
import { auth } from '../firebaseconfig'
import { signOut } from 'firebase/auth';


  
const Navbar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    
        // Clear any existing timer
        if ((window).searchTimer) {
          clearTimeout((window).searchTimer)
        }
        (window).searchTimer = setTimeout(() => {
          onSearch(query);
        }, 2000)
    }

    const handleLogout = async () => {
        await signOut(auth)
        console.log('logged out')
    }
    
  return (
    <div className="navbar bg-base-100 md:px-[4rem] px-4 py-4 border-b-2 border-[#e0e0e0]">
        <div className="flex-1">
            <a className="normal-case text-xl"><img src='/logo.png' alt='logo' className='w-[3rem] h-[3rem] rounded-full'/></a>
        </div>
        <div className="flex-none gap-2">
            <div className="form-control">
                <input type="text" 
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange} 
                  className="input input-bordered w-48 md:w-auto" />
            </div>
            <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                <img src="/user.jpeg" />
                </div>
            </label>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li><a role='button' onClick={handleLogout}>Logout</a></li>
            </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar
