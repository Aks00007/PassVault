import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-gray-900 text-white'>
            <div className="mycontainer flex justify-center items-center gap-2 mx-auto py-5 h-14">
                <span><img src="/src/assets/lock.png" alt="" /></span>
                <div className="logo font-bold text-2xl cursor-default">
                    <span className="text-gray-500">&lt;</span>
                    <span>Pass</span>
                    <span className="text-gray-500">Vault/&gt;</span>
                </div>
                <span><img src="/src/assets/lock.png" alt="" /></span>
                {/* <button className='text-white bg-gray-700 hover:bg-gray-600 my-5 mx-2 rounded-full flex justify-between items-center cursor-pointer ring-white ring-1'>
                    <img className='invert w-10 p-1' src="/src/assets/github.png" alt="github" />
                    <span className='font-bold px-2'>Github</span>
                </button> */}
            </div>
        </nav>
    )
}

export default Navbar
