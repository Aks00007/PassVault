import React from 'react'

const Footer = () => {
    return (
        <div className='bg-gray-900 text-white flex flex-col justify-center items-center bottom-0 w-full cursor-default'>
            <div className="logo font-bold text-2xl">
                <span className="text-gray-500">&lt;</span>
                <span>Pass</span>
                <span className="text-gray-500">Vault/&gt;</span>
            </div>
            <div className='flex'>
                © 2025 Aayush Kumar Singh. All Rights Reserved.
            </div>
        </div>
    )
}

export default Footer
