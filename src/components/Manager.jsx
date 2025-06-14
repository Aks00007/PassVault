import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { __unstable__loadDesignSystem } from 'tailwindcss';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }


    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("/src/assets/hidden.png")) {
            ref.current.src = "/src/assets/show.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "/src/assets/hidden.png"
            passwordRef.current.type = "text"
        }
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form]);
            setForm({ site: "", username: "", password: "" });
            toast('Saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
        else {
            toast('Error: Data should contain atleast 3 characters!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    }

    const deletePassword = (id) => {
        // console.log("Deleting Pass with id" + id);
        let c = confirm("Do you really want to delete?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    }

    const editPassword = (id) => {
        // console.log("Editing Pass with id" + id);
        setForm(passwordArray.filter(item => item.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="p-3 md:mycontainer min-h-[85vh]">
                <h1 className='text-4xl text font-bold text-center'>
                    <span className="text-gray-500">&lt;</span>
                    <span>Pass</span>
                    <span className="text-gray-500">Vault/&gt;</span>
                </h1>
                <p className='text-gray-900 text-lg text-center'>"Because your brain has better things to remember"</p>

                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input className='rounded-full border border-black w-full px-4 py-1' type="text" value={form.site} onChange={handleChange} placeholder='Enter Website URL' name='site' id='site' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input className='rounded-full border border-black w-full px-4 py-1' type="text" value={form.username} onChange={handleChange} placeholder='Enter Username' name='username' id='username' />
                        <div className="relative">
                            <input ref={passwordRef} className='rounded-full border border-black w-full px-4 py-1' type="password" value={form.password} onChange={handleChange} placeholder='Enter Password' name='password' id='password' />
                            <span className='absolute right-[10px] top-[7px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} width={20} src="/src/assets/show.png" alt="" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-gray-600 hover:bg-gray-500 rounded-full px-8 py-2 w-fit cursor-pointer gap-2 border border-black'>
                        {/* <img src="/src/assets/add.gif" alt="add" width={32} /> */}
                        <lord-icon
                            src="https://cdn.lordicon.com/sbnjyzil.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#121331,secondary:#30c9e8">
                        </lord-icon>
                        Save</button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full overflow-hidden rounded-md mb-4">
                        <thead className='bg-gray-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-gray-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='p-2 border border-white text-center w-xl'>
                                        <div className='flex justify-between items-center'>
                                            <a /*href={item.site} target='_blank'*/>{item.site}</a>
                                            <div className='size-7' onClick={() => { copyText(item.site) }} >
                                                <img src="/src/assets/copy1.png" alt="copy" className='cursor-pointer' />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='p-2 border border-white text-center w-32'>
                                        <div className='flex justify-between items-center'>
                                            <span>{item.username}</span>
                                            <div className='size-7' onClick={() => { copyText(item.username) }}>
                                                <img src="/src/assets/copy1.png" alt="copy" className='cursor-pointer' />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='p-2 border border-white text-center w-32'>
                                        <div className='flex justify-between items-center'>
                                            <span>{item.password}</span>
                                            <div className='size-7' onClick={() => { copyText(item.password) }}>
                                                <img src="/src/assets/copy1.png" alt="copy" className='cursor-pointer' />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='flex justify-center items-center p-2 border border-white text-center w-auto'>
                                        <span className='cursor-pointer mx-1 w-7' onClick={() => { editPassword(item.id) }}><img src="/src/assets/edit1.png" alt="edit" /></span>
                                        <span className='cursor-pointer mx-1 w-7' onClick={() => { deletePassword(item.id) }}><img src="/src/assets/bin1.png" alt="delete" /></span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
