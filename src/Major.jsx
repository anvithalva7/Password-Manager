import React from 'react'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


const Major = () => {
    const [form, setform] = useState(
        {
            id: uuidv4(),
            site: "",
            username: "",
            password: ""
        })

    const [newform, setnewform] = useState([])

    const savePassword = async (e) => {
        e.preventDefault()
        if (!form.site || !form.username || !form.password) {
            alert('Data Insufficient');
        }
        else {
            setnewform([...newform, form])
            await fetch("http://localhost:3000/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...form })
            })
            setform({
                id: uuidv4(),
                site: "",
                username: "",
                password: ""
            })
        }

    }

    const getpasswords = async () => {
        let req = await fetch("http://localhost:3000/")

        let newform = await req.json();

        // console.log(newform);
        setnewform(newform)
    }


    useEffect(() => {
        getpasswords()
    }, [])


    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleEditing = async (e) => {
        setform(e)
        await fetch("http://localhost:3000/", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: e.id })
        })

        setnewform(newform.filter((item) => {
            return e.id !== item.id
        }))


    }
    const handleDeleting = async (e) => {
        setnewform(newform.filter((item) => {
            return e.id !== item.id
        }))

        await fetch("http://localhost:3000/", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: e.id })
        })

    }
    const handlecopy = (e) => {
        copytext(e)
    }


    const copytext = (e) => {
        navigator.clipboard.writeText(e)

        toast.success('🦄 Copied to Clipboard', {
            position: "bottom-right",
            autoClose: 3000,  // Ensures it disappears
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: "dark",
        });

    }

    return (


        <div >

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="dark"
                limit={1}
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            <div className="container mx-auto text-center w-[100%]">
                <div className="logo text-4xl cursor-pointer"><span className='text-green-600 font-medium'>&lt;</span>
                    <span>For</span>
                    <span className='text-green-600 font-medium'>Ever/&gt;</span>
                </div>
                <h3 className='mt-2 mb-4 '>!___Your Own Password Manager___!</h3>
                <form action="" >
                    <div className="allinputs w-[100%]">
                        <div className="mainlab w-full mx-auto my-5">
                            <input value={form.site} onChange={(e) => {
                                handlechange(e)
                            }} className='w-3/4 border border-green-500 rounded-lg px-2 py-1' type="text" name='site' placeholder='Enter Website URL' />
                        </div>
                        <div className="restlab flex justify-center items-center gap-7 w-3/4 mx-auto mb-7">
                            <input value={form.username} name='username' onChange={(e) => {
                                handlechange(e)
                            }} className='border border-green-500 rounded-lg  px-2 py-1 flex-1' type="text" placeholder='Enter Username' />
                            <input value={form.password} name='password' onChange={(e) => {
                                handlechange(e)
                            }} className='border border-green-500 rounded-lg  px-2 py-1 flex-1' type="password" placeholder='Enter Password' />
                            <button onClick={savePassword} className='border border-black bg-green-500 hover:bg-green-400 py-2 px-2 rounded-full flex justify-center
                            items-center'>
                                <lord-icon
                                    src="https://cdn.lordicon.com/tsrgicte.json"
                                    trigger="hover"
                                    stroke="bold"
                                >
                                </lord-icon>
                                <span>Save Password</span>
                            </button>
                        </div>
                    </div>
                </form>
                <h3 className='mt-2 mb-4 font-medium text-xl'>Your Passwords</h3>
                {newform.length === 0 ? <div className='mt-2 mb-4 font-medium text-xl text-green-800'>"No Passwords to Display"</div> :
                    <div className="urpass mx-auto flex justify-center items-center">
                        <table className="table-auto w-full">
                            <thead className='bg-green-800'>
                                <tr>
                                    <th>Site</th>
                                    <th>UserName</th>
                                    <th>Passwords</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {newform.map((i) => {
                                    return <tr key={i.id} className='border border-white p-2'>
                                        <td >
                                            <div className='flex justify-between items-center gap-2 cursor-pointer'>
                                                <span><a href={i.site} target='_blank'>{i.site}</a></span>
                                                <span className="copying " onClick={() =>
                                                    handlecopy(i.site)
                                                }>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/jectmwqf.json"
                                                        trigger="hover"
                                                        stroke="bold"
                                                    >
                                                    </lord-icon></span>
                                            </div>
                                        </td>

                                        <td ><div className='flex justify-between items-center gap-2 cursor-pointer'>
                                            <span>{i.username}</span>
                                            <span className="copying " onClick={() =>
                                                handlecopy(i.username)
                                            }>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/jectmwqf.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                >
                                                </lord-icon>
                                            </span>
                                        </div>

                                        </td>
                                        <td ><div className='flex justify-between items-center gap-2 cursor-pointer'>

                                            <span>{i.password}</span>
                                            {/* <span>{"*".repeat(i.password.length)}</span> */}
                                            <span className="copying " onClick={() =>
                                                handlecopy(i.password)
                                            }>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/jectmwqf.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                >
                                                </lord-icon>
                                            </span>
                                        </div>

                                        </td>
                                        <td>
                                            <div className="crud flex justify-center items-center gap-3 cursor-pointer">
                                                <span onClick={() => {
                                                    handleEditing(i)
                                                }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/exymduqj.json"
                                                        trigger="hover"
                                                        stroke="bold"                                                        >
                                                    </lord-icon>
                                                </span>
                                                <span onClick={() => {
                                                    handleDeleting(i)
                                                }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/hwjcdycb.json"
                                                        trigger="hover"
                                                        stroke="bold"
                                                    >
                                                    </lord-icon>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    )
}

export default Major
